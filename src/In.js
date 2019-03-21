import React , {Component} from 'react';
// import Input from "./Input";
// import './Newcss.css'
import './itemcss.css'
import axios from 'axios';
class In extends Component {
	//constructor and state
	constructor(){
			super()
			this.state={
				list : [],
				tasks:0,
				vale:"",
				completedTasks:0,
				todolist:[]
			}}

		
	componentDidMount(){
		window.addEventListener('beforeunload', this.onUnloadCleanup);
		axios.get('http://localhost:4000/todos')
			.then(res =>{
				this.setState({
					todolist:res.data
				})
				console.log(this.state.todolist[3].todoDescription)
			})

		if(localStorage.getItem("lists")!=null){
			let  v = localStorage.getItem("value");
			// let c = localStorage.getItem("complete");
			// console.log(v,c);
			if(parseInt(v) < 0){
				this.setState({
					tasks:0
				});
			}else{
				this.setState({
					tasks:parseInt(v)
				});
				
			}
			this.setState({
				list:JSON.parse(localStorage.getItem("lists")),
				// completedTasks:parseInt(c)
				
			});
		}
	}

	onUnloadCleanup=()=>{
		localStorage.setItem("lists",JSON.stringify(this.state.list));
		localStorage.setItem("value",JSON.stringify(this.state.tasks));
		// localStorage.setItem("complete",JSON.stringify(this.state.completedTasks));
	}
	addingItems=()=>{
		console.log(this.state.completedTasks);
		let todo ={
			todoDescription:this.state.vale
		}
		axios.post('http://localhost:4000/todos/add',todo)
			.then(res =>{
				console.log('added to database successfully')
			})
			.catch(err =>{
				console.log(`not able to add ${err}`)
			})
		this.setState(oldState=>({
			list:[...oldState.list,oldState.vale],
			vale:" ",
			tasks:oldState.tasks + 1
		}));
		
	}

	deleteItems=(e)=>{
		this.state.list.splice(e,1);
		this.setState(oldState=>({
			tasks:oldState.tasks - 1,
			completedTasks:oldState.completedTasks+1
		}));
		let a = this.state.completedTasks;
		console.log(a);
	}
	changingVal=(event)=>{
		this.setState({
			vale:event.target.value
		});
	}	
	en = (event)=>{
		if(event.key === "Enter"){this.addingItems()}
	}
	//render 
	render(){

		return(<div>
			<div className="search">
				<h1>To-Do List Made with React</h1>
				<input onKeyPress={this.en} type="text" onChange={this.changingVal} value={this.state.vale} placeholder="enter your todo" />
				<button onClick={this.addingItems} >Submit</button>
				<div className="h">
				<h1>Completed tasks={this.state.completedTasks}</h1>
				<h1>no of tasks={this.state.tasks}</h1></div>
			</div>
			<div className="todo">
				<ol>
					{this.state.todolist.map((k,i)=>
						<li key={i} >{k.todoDescription}<button onClick={()=>this.deleteItems(i)}>Delete</button></li>
					)}
				</ol>
				</div>
			<div className="todo">
				<ol>
					{this.state.list.map((k,i)=>
						<li key={i} >{k}<button onClick={()=>this.deleteItems(i)}>Delete</button></li>
					)}
				</ol>
				</div>
				
			</div>
			)
	}


}
export default In;
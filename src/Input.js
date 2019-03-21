import React from 'react';
import './Newcss.css'

const Input = (props)=>{
	return(
		<input type="color" 
		value={props.name} 
		id={props.id} 
		onChange={props.val}/>

		)


}
export default Input;
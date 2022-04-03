import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App(){

	let [subject, setSubject] = useState(['남자 코트 추천', '강남 우동 맛집', '강남 우동 맛집2']);
	let [like, setLike] = useState([0, 0, 0]);
	let [modal, setModal] = useState(false);
	let [currentModal, setCurrentModal] = useState(0);
	let [value, setValue] = useState('');

	let [posts, setPosts] = useState([]);

	function addLike(idx) {
		var newLike = [...like];
		newLike[idx]++;
		return newLike;
	}

	function UI() {
		var newUI = [];
		for(var i=0; i < 3; i++){
			newUI.push(<div>안녕</div>)
		}
		return newUI;
	}

	return (
	  <div className="App">

			<div className="black-nav">
				<div>개발 blog</div>
			</div>

			{ UI() }

			{
				subject.map((a, i)=>{
					return (
						<div className="list" key={i} >
							<h3 onClick={ ()=>{ setCurrentModal(i); } }>{ a } <span onClick={ ()=>{ setLike(addLike(i)) } }>LIKE</span> { like[i] } </h3>
							<p>2월 17일 발행</p>
							<hr/>
						</div>
					)
				})
			}

			<div>
				
			
				<div className="publish">
					<input onChange={
						(e)=>{
							setValue(e.target.value);
						}
					} />
					<button onClick={
						()=>{
							var newArr = [...subject];
							newArr.unshift(value);
							setSubject(newArr);
						}
					}>저장</button>
				</div>
			</div>

			{
				modal === true
				? <Modal subject={ subject[currentModal] } />
				: null
			}

			<button onClick={ ()=>{ setModal( !modal ) } }>Modal Open</button>

		</div>	
	)
 }

 function Modal(props) {
	 return (
		<div className='modal'>
			<h2>{props.subject}</h2>
			<p>날짜</p>
			<p>상세</p>
		</div>
	 )
 }

export default App;

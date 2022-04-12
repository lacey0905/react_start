import React, { useEffect, useState, useContext} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './detail.scss';
import { invenContext } from './App.js';
import { Nav} from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

let Box = styled.div`
    padding : 20px;
    background-color:blue;
    color:#fff;
`;

let Title = styled.h4`
`;

function Detail(props) {

    let [alert, setAlert] = useState(true);
    let [inp, setInp] = useState(0);
    let inven = useContext(invenContext);

    let [누른탭, 누른탭변경] = useState(0);
    let [action, setAction] = useState(false);

    useEffect(function(){
        let timer = setTimeout(function(){
            setAlert(false);
        }, 2000);
        return function(){
            clearTimeout(timer);
        }
    },[alert]);

    let { id } = useParams();
    let history = useHistory();

    let getItem = props.shoes.find(function(item){
        return item.id == id
    });

	return (
		<div className="container">
            { inven }
            <Box>
                <Title className='red'>aaa</Title>
            </Box>
            { inp }
            <input onChange={
                function(e){
                    setInp(e.target.value)
                }
            } />
            
            {
                alert === true
                ? <Alert />
                : null
            }

			<div className="row">
				<div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${getItem.id+1}.jpg`} width="100%" />
                    </div>
                    <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{ getItem.title }</h4>
                    <p>{ getItem.content }</p>
                    <p>{ getItem.price } 원</p>

                    <Info inventory={ props.inventory }/>

                    <button className="btn btn-danger" onClick={function(){
                        props.setInventory([9, 11, 12]);
                    }}>주문하기</button> 
                    <button className="btn btn-danger" onClick={()=>{
                        history.push('/');
                    }} >뒤로가기</button> 
				</div>
			</div>

                <div>
                    <Nav variant="tabs" defaultActiveKey="link-0">
                        <Nav.Item>
                        <Nav.Link eventKey="link-0" onClick={()=>{ setAction(false); 누른탭변경(0) }}>Active</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="link-1" onClick={()=>{ setAction(false); 누른탭변경(1) }}>Option 2</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <CSSTransition in={ action } classNames="wow" timeout={500}>
                        <TabContent 누른탭={누른탭} setAction={setAction} />
                    </CSSTransition>
                </div>

		</div> 
	)
}

function TabContent(props){

    useEffect(()=>{
        props.setAction(true);
    });

    if (props.누른탭 === 0){
      return <div>내용0</div>
    } else if (props.누른탭 === 1){
      return <div>내용1</div>
    } else if (props.누른탭 === 2){
      return <div>내용2</div>
    }
  }

function Info(props){
    return (
        <p>재고 : { props.inventory[0] }</p>
    )
}

function Alert() {
    return (
        <div className='my-alert'>
            <p>재고 얼마 없음</p>
        </div>
    )
}

export default Detail;
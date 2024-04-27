import { useEffect, useState } from 'react';
import './slider.css';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

//리액트아이콘
//npm install react-icons


//슬라이더는 컴포넌트를 function으로 만든다.
//컴포넌트는 척슬자 대문자
//다른곳에서 사용하기 위해서 export default
function ImageSlider(props){
  //useState를 2개 만듬(이미지들, 현재슬라이드번호)
  let [images, setImages] = useState([]);
  let [curSlide, setCurSlide] = useState(0);
  let [loading, setLoading] = useState(null);


  //picsum서버에서 get요청을 통해 이미지를 받아오기
  //https://picsum.photos/v2/list?page=1&limit=10\
  useEffect(()=>{
    //mound 생성/ update 갱신/ unmount 제거
    //3개의 이벤트에 대해서 실행할 코드를 넣는 공간
    // 평소에는 mount와 update는 값이 동작
    //unmount는 return()에서 동작
    //update의 동작을특정 대상에 대해서만 실행하려면
    //두번째 인자에 []로 넣어줌
    if(props.url !== ''){
      //fetch를 통해서 이미지를 get요청하자
      fetchImages(props.url);

    }
    return(()=>{
      //unmount 공간
    })
  }, [props.url])  //[]에 state를 넣으면 update가 해당 state갱신시에만 발동하게 변경

  async function fetchImages(getUrl){
    setLoading(true);
    //get요청으로 이미지 경로를 받아온다(async 비동기: 화면동작에 영향을 미치지 않기위해)
    //await 이거 완료될때까지 기다려라
    let responese = await fetch(`${getUrl}?page=${props.page}&limit=${props.limit}`);
    const data = await responese.json();  //받아온 문자열을 json형태로 인식

    if(data){
      setImages(data);
      setLoading(false);
    }
  }
  function goPrev(){
    if(curSlide === 0){
      //마지막 위치는 전체 크기에서 -1
      setCurSlide(images.length-1);
    } else {
      setCurSlide(curSlide -1);
    }
  }

  function goNext(){
    if(curSlide === (images.length-1)){
      setCurSlide(0);
    } else {
      setCurSlide(curSlide +1);
    }
  }

  return(
    <>
      <div className="slider-contatiner"> 
        <BsArrowLeftCircleFill className='arrow arrow-left' 
        onClick={goPrev}/>
        {
          images && images.length ? (
            images.map((image, idx)=>{
              return(
                <img key={image.id} src={image.download_url} width={'300px'}
                className={curSlide === idx ? "current-image": "current-image hide-current-image"}></img>
              )   
            })
          )
          : <div>이미지 로딩중 ...</div>
        }
        <BsArrowRightCircleFill className='arrow arrow-right' onClick={goNext}/>
        {/* {
          loading == true ? 
          (<div> 이미지 로딩 중 ... </div>)
          : (<div>슬라이더 컴포넌트</div>)
        } */}

      </div>
    </>
  )
}

//export default 파일의 대표
//export 추가로 내보낼 변수 또는 함수
export default ImageSlider;
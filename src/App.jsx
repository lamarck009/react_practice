import { useState, useEffect } from 'react'
import './App.css'

// App.jsx

function App() {
  const [dogImage, setDogImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [delay, setdelay] = useState('5')
  const [error, setError] = useState(null)
  

    // async로 dog 이미지 로딩 기다림
      const fetchDog = async () => {
        console.log("불러옴")
        //새로고침 중임을 확인 true
        try {
          const response = await fetch('https://dog.ceo/api/breeds/image/random')
          const data = await response.json()
          setDogImage(data.message)
          setError(null)
        } catch (err) {
          setError('강아지 이미지를 가져오는데 실패했습니다.')
        } finally {
        }
      }
  //isrefresh 변경 시 딜레이 세팅하도록 수정정
  useEffect(() => {
  
    const value = Math.min(10, Math.max(1, parseInt(delay) || 1))
    let inter;
    if(isLoading){
      fetchDog()

      inter = setInterval(()=>{
        fetchDog()
      },value*1000)
    }
    return () => {
      if (inter) clearInterval(inter); // intervalId가 존재하면 타이머 중지
    };
  }, [isLoading])

//토글 방식
const toggle =()=>{
//껐다 키기
if (isNaN(delay)){
  alert("숫자만 입력해주세요");
}
else setIsLoading(!isLoading)
}

  return (
    <div className="container">
      <h1>🐕 랜덤 강아지 이미지 🐕</h1>
      {error && <p className="error">{error}</p>}
      {dogImage && (
        <div className="dog-img">
          <img 
            src={dogImage} 
            alt="Random Dog" 
            className="dog-box"
          />
        </div>
      )}
      <div>
      <input type='textbox' className='inputdelay'
      value={delay}
      onChange={(e) => setdelay(e.target.value)}
      placeholder="새로고침 간격" 
      ></input>
      <span>초</span>
      <div>(최소 : 1, 최대 : 10초)</div>
      </div>
      <button 
        onClick={toggle} 
        className={isLoading?"load":""}
              >
        {isLoading ? '새로고침\n멈추기' : '새로운\n강아지 보기'}
      </button>
    </div>
  )
}

export default App
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom"
import './main.css';

export default function BoxOffice() {

  //state 변수
  const [viewDay, setViewDay] = useState();
  const [viewDayF, setViewDayf] = useState();
  const [officeList, setofficeList] = useState([]);

  //Ref 변수
  const refDateIn = useRef();

  // const getBoxOffice = () =>{
  //   let url = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
  //   url = url + 'key=' + 'f5eef3421c602c6cb7ea224104795888&';
  //   url = url + 'targetDt=' + '20120101';

  /* 
  //비동기 통신
  fetch(url)
  //.then((response)=>{return response.json()})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {console.log(error)});
  */


  const getBoxOffice = async (d) => {
    let url = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
    url = url + 'key=' + 'f5eef3421c602c6cb7ea224104795888&';
    url = url + 'targetDt=' + d;

    //비동기 통신 : async
    try {
      const response = await fetch(url);
      const data = await response.json();

      
      let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
      setofficeList(
        dailyBoxOfficeList.map((item) => <li key={item.movieCd}>
          <Link to={'/mv?mvcd=' + item.movieCd}>
            <span className="rank">{item.rank}</span>
            <span className="mvname">{item.movieNm}</span>                             
          </Link>
          <span className="updown">{item.rankInten > 0 ? '🔺' : item.rankInten < 0 ? '🔻' : ''}{Math.abs(Number(item.rankInten))===0?' ':Math.abs(Number(item.rankInten))}</span>             
        </li>)
      )

    } catch (error) {
      console.log(error);
    }

  }
  //페이지가 처음 렌더링이 되었을떄 실행되는 HOOK
  useEffect(() => {
    //어제 날짜 추출
    //const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(new Date().getDate() - 1);
    let d = yesterday.toISOString().substring(0, 10).replaceAll("-", "");

    //state변수 변경
    setViewDay(d);

    //console.log(yesterday.toDateString());
    getBoxOffice(d);
  }, []);

  useEffect(() => {
    (viewDay && setViewDayf(viewDay.substring(0, 4) + "." + viewDay.substring(4, 6) + "." + viewDay.substring(6, 8)))
    getBoxOffice(viewDay);
  }, [viewDay])

  //이벤트 함수
  const handleChange = (e) => {
    e.preventDefault();
    setViewDay(refDateIn.current.value.replaceAll("-", ""));
  }

  return (
    <>
      <h1>박스오피스 ({viewDayF}일자)</h1>
      <form>
        <input type="date" name="dateIn" ref={refDateIn} onChange={handleChange} />
      </form>
      <ul>
      {officeList}
      </ul>
    </>
  );
}
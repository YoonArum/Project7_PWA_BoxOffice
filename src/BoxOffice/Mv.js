import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import qs from 'query-string';

export default function Mv() {
  const loc = useLocation().search;
  

  const mvcd = qs.parse(loc).mvcd;
  

  //state변수
  const [mv, setMv] = useState();
  const [mvinfo, setMovieInfo] = useState();

  //함수
  const getMovie = async (mvcd) => {
    let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?'
    url = url + 'key=f5eef3421c602c6cb7ea224104795888&'
    url = url + 'movieCd=' + mvcd;

    const resp = await fetch(url);
    const data = await resp.json();

    setMovieInfo(data);

    
  }

  useEffect(() => {
    getMovie(mvcd);
  }, []);

  useEffect(() => {

    
  }, [mvinfo]);



  return (
    <>
      <h1>영화정보</h1>
      {mv && <mvinfo />}
    </>
  );
}
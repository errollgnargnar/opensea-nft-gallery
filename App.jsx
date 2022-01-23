const { Button } = ReactBootstrap;

function PageNav({currentPage, onNav}) {

  if (currentPage == 1){
    return (
      <div className="page-nav">
        <Button  disabled>Prev Page</Button>
        <Button  onClick={(e) => onNav(e.target.innerHTML)}>Next Page </Button>
      </div>
    )
  } else {
    return (
      <div className="page-nav">
      <Button  onClick={(e) => onNav(e.target.innerHTML)}>Prev Page</Button>
      <Button  onClick={(e) => onNav(e.target.innerHTML)}>Next Page </Button>
      </div>
    )
  }
}

function NFTInfo({info}) {
  if (typeof info == 'string') {
    return (
      <>
            {info.slice(0,100)}
      </>
    )
  } else {
    return (
      <>
        no info
      </>
    )
  }
}

function App() {

  const { useState, useEffect  } = React;
  const { Card } = ReactBootstrap;

  console.log('rendered');

  const [itemData, setItemData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let url = `https://api.opensea.io/api/v1/assets?offset=${currentPage}`;

  useEffect(() => {
    async function callOpenSea() {
      // Make a request for a user with a given ID
      fetch(url)
      .then( (response)=> {
        // handle success
        return response.json()
      })
      .then (json => {
        console.log(json);
        let assetsArr = [];
        json.assets.forEach(asset => assetsArr.push({title: asset.name, img: asset.image_url, link: asset.permalink, info: asset.collection.description}));
        setItemData(assetsArr);
      })
      .catch((error)=> {
        // handle error
        console.log(error);
      });
    };
    callOpenSea();
  }, [currentPage]);

  const changePage = (btnText) => {
    console.log("Next Page" !==  btnText);
    if (btnText !== "Next Page") {
      setCurrentPage(Number(currentPage)+1);
      console.log(currentPage);
    } else {
      setCurrentPage(Number(currentPage)-1);
    }
  }

  return (
    <>
    <h3>OpenSea Asset Gallery</h3>
    <div className="gallery">
      {itemData.map((item, i) => (
        <div key={i}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${item.img}` || 'https://miro.medium.com/max/3150/1*Pgz8IcsHpZK8kf4D2JiTEg.png'} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                <NFTInfo info={item.info} />
              </Card.Text>
              <a href={`${item.link}`} target='_blank'>
                <Button variant="primary">View On OpenSea</Button>
              </a>
            </Card.Body>
          </Card>
        </div>
      ))}

    </div>
    <PageNav currentPage={currentPage} onNav={changePage} />
    </>

  );
}


// ========================================
ReactDOM.render(<App />, document.getElementById("root"));

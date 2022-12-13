import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  let params = useParams();

  const [details, setDetails] = useState({});
  const [activeTap, setActiveTap] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `http://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailsData = await data.json();
    setDetails(detailsData);
    console.log(detailsData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailsWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTap === "instructions" ? "active" : ""}
          onClick={() => setActiveTap("instructions")}
        >
          instructions
        </Button>
        <Button
          className={activeTap === "ingredients" ? "active" : ""}
          onClick={() => setActiveTap("ingredients")}
        >
          ingredients
        </Button>
        {activeTap === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTap === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((item) => {
              return <li key={item.id}>{item.original}</li>;
            })}
          </ul>
        )}
      </Info>
    </DetailsWrapper>
  );
};

const DetailsWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  h2 {
    margin-bottom: 2rem;
  }

  .active {
    margin-bottom: 2rem;
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  li {
    font-size: 1rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
`;
const Button = styled.button`
  padding: 1rem 2rem;
  background: white;
  border: 2px solid black;
  color: #313131;
  margin-right: 2rem;
  font-weight: 600;
`;
const Info = styled.div`
  margin-left: 2rem;
`;

export default Recipe;

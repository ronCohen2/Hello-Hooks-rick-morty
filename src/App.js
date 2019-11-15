import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Container,
  Row,
  Col,
  Form,
  Button
} from "reactstrap";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCharacter = async name => {
    const response = await Axios.get(
      `https://rickandmortyapi.com/api/character/?name=${search}`
    );
    const character = await response.data.results;
    setData(character);
  };

  useEffect(() => {
    fetchCharacter(search);
  }, [search]);

  return (
    <Container className="App">
      <Row>
        <h1>Rick and Morthy Character !</h1>
      </Row>
      <Row>
        <SearchCharacter setSearch={setSearch} />
      </Row>
      <Row>
        {data.map((character, key) => {
          return (
            <Col md="3">
              <CharacterCard character={character} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export const SearchCharacter = ({ setSearch }) => {
  let searchInput = React.createRef();

  const handleSubmit = e => {
    e.preventDefault();
    setSearch(searchInput.current.value);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <input ref={searchInput} />
      <Button type="submit">Search</Button>
    </Form>
  );
};

export const CharacterCard = props => {
  const {
    image,
    name,
    status,
    gender,
    location,
    id,
    species,
    created
  } = props.character;
  return (
    <Card key={id} className="character-card">
      <CardImg top src={image} />
      <CardBody>
        <CardTitle className="CardTitle">{name}</CardTitle>
        <CardText>
          Status : <span>{status}</span>
        </CardText>
        <CardText>
          Gebder : <span>{gender}</span>
        </CardText>
        <CardText>
          species : <span>{species}</span>
        </CardText>
        <CardText>
          Location : <span>{location.name}</span>
        </CardText>
      </CardBody>
    </Card>
  );
};
export default App;

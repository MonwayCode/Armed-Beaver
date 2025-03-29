import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./TankStyle.css";
import NavScroll from './NavSroll';
import BabylonViewer from "./model3d"; 

interface Tank {
  name: string;
  country: string;
  rank: string;
  battleRating: string;
  tankType: string;
  researchCost: string;
  purchaseCost: string;
  model3DPath: string;
  jpgPath: string;
}

const getTankTypeTranslation = (type: string) => {
  switch (type.toLowerCase()) {
    case 'heavy':
      return ' Ciężki';
    case 'medium':
      return ' Średni';
    case 'light':
      return ' Lekki';
    case 'tk':
      return ' Niszczyciel czołgów';
    case 'aa':
      return ' Samobieżny zestaw przeciwlotniczy';
    default:
      return type;
  }
};

const TankDetails = () => {
  const { id } = useParams();
  const [tank, setTank] = useState<Tank | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5114/tanks/${id}`)
      .then((response) => {
        setTank(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Błąd ładowania danych:", error));
  }, [id]);

  if (loading) return <div className="text-center mt-5 text-white">Ładowanie...</div>;
  if (!tank) return <div className="text-center mt-5 text-white">Błąd ładowania czołgu</div>;

  
  return (
    <div className="App" style={{ backgroundColor: "#1d3b35" }}>
      <NavScroll />
      <Container className="mt-5">
        <Card className="tank-card shadow-lg border-0 p-4 text-white">
          <div className="tank-banner d-flex justify-content-center">
            <img
              src={tank.jpgPath}
              alt={tank.name}
              className="tank-image"
            />
          </div>

          <h1 className="text-center text-warning mt-3">{tank.name}</h1>

          <h3 className="text-center mt-4">Podstawowe informacje</h3>
          <Row className="mt-3 text-center">
            <Col md={6} className="info-box">
              <span className="info-title">Kraj:</span>
              <span className="info-value">{tank.country}</span>
            </Col>
            <Col md={6} className="info-box">
              <span className="info-title">Typ:</span>
              <span className="info-value">{getTankTypeTranslation(tank.tankType)}</span>
            </Col>
          </Row>

          <h3 className="text-center mt-4">Pancerz</h3>
          <table className="table table-dark table-striped mt-3">
            <thead>
              <tr>
                <th scope="col">Gdzie</th>
                <th scope="col">Kadłub</th>
                <th scope="col">Wieża</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Góra</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Tył</td>
                <td>Wiersz 2, Kolumna 2</td>
                <td>Wiersz 2, Kolumna 3</td>
              </tr>
              <tr>
                <td>Bok</td>
                <td>Wiersz 3, Kolumna 2</td>
                <td>Wiersz 3, Kolumna 3</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 text-center">Model 3D</h3>
          <div className="d-flex justify-content-center">
            {tank?.model3DPath && <BabylonViewer modelUrl={tank.model3DPath} />}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default TankDetails;

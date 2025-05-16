import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Container, Row, Col, Card, Table, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavScroll from "./NavSroll";
import "./TankStyle.css";

interface Tank {
  tankId: number;
  name: string;
  country: string;
  tankType: string;
  jpgPath: string;
  specifications?: {
    crewCount: number;
    maxForwardSpeed: number;
    maxBackwardSpeed: number;
    enginePower: number;
    weight: number;
    powerToWeightRatio: number;
    armor?: {
      hullFront: number;
      hullSide: number;
      hullRear: number;
      turretFront: number;
      turretSide: number;
      turretRear: number;
    };
    gun?: {
      gunName: string;
      ammunitionCount: number;
      caliber: number;
      reloadTime: number;
      turretRotationSpeed: number;
      verticalGuidance?: {
        min: number;
        max: number;
      };
    };
  };
}

const getTankTypeTranslation = (type: string) => {
  switch (type.toLowerCase()) {
    case "heavy":
      return "Ciężki";
    case "medium":
      return "Średni";
    case "light":
      return "Lekki";
    case "tk":
      return "Niszczyciel czołgów";
    case "aa":
      return "Samobieżny zestaw przeciwlotniczy";
    default:
      return type;
  }
};

const getTankCountry = (type: string) => {
  switch (type.toLowerCase()) {
    case "germany":
      return "Niemcy";
    case "uk":
      return "Wielka Brytania";
    case "usa":
      return "Stany Zjednoczone";
    case "china":
      return "Chiny";
    default:
      return type;
  }
};

const TankComparator = () => {
  const [tanks, setTanks] = useState<Tank[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTanks = async () => {
      const stored = localStorage.getItem("tankToCompare");
      if (!stored) {
        setTanks([]);
        return;
      }

      const ids: string[] = JSON.parse(stored);

      if (!ids.length) {
        setTanks([]);
        return;
      }

      try {
        const tankPromises = ids.map((id) =>
          axios.get<Tank>(`http://localhost:5114/tanks/${id}`)
        );
        const responses = await Promise.all(tankPromises);
        setTanks(responses.map((r) => r.data));
      } 
      catch (err) 
      {
        setError("Wystąpił błąd podczas ładowania danych czołgów");
      } 
    };

    fetchTanks();
  }, []);

  const removeTankFromCompare = (tankId: number) => {
    const stored = localStorage.getItem("tankToCompare");
    if (!stored) return;

    const currentIds = JSON.parse(stored);
    const newIds = currentIds.filter((id: string) => id !== tankId.toString());

    if (newIds.length > 0) {
      localStorage.setItem("tankToCompare", JSON.stringify(newIds));
      window.location.reload();
    } else {
      localStorage.removeItem("tankToCompare");
      navigate("/");
    }
  };

  if (tanks.length === 0) return <div className="text-center mt-5 text-white">Brak czołgów do porównania</div>;

  return (
    <div className="App" style={{ backgroundColor: "#1d3b35" }}>
      <NavScroll />
      <Container className="mt-5 pb-5">
        <h1 className="text-center text-warning mb-4">Porównywarka czołgów</h1>
        
        <Alert variant="info" className="text-center">
          {tanks.length < 3 && (
            <span>Możesz dodać do porównania maksymalnie 3 czołgi. Aktualnie masz {tanks.length}/3.</span>
          )}
        </Alert>

        {/* Nagłówki czołgów */}
        <Row className="mb-4">
          {tanks.map(tank => (
            <Col key={tank.tankId} md={12 / tanks.length}>
              <Card className="text-center bg-dark text-white">
                <Card.Img variant="top" src={tank.jpgPath} style={{ height: "100%", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{tank.name}</Card.Title>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => removeTankFromCompare(tank.tankId)}
                  >
                    Usuń
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Tabele porównawcze */}
        <h2 className="text-center text-white mt-5 mb-3">Podstawowe parametry</h2>
        <Table striped bordered hover variant="dark" className="mb-5">
          <thead>
            <tr>
              <th>Parametr</th>
              {tanks.map(tank => <th key={tank.tankId}>{tank.name}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kraj</td>
              {tanks.map(tank => <td key={tank.tankId}>{getTankCountry(tank.country)}</td>)}
            </tr>
            <tr>
              <td>Typ</td>
              {tanks.map(tank => <td key={tank.tankId}>{getTankTypeTranslation(tank.tankType)}</td>)}
            </tr>
            {tanks[0].specifications && (
              <>
                <tr>
                  <td>Załoga</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.crewCount}</td>)}
                </tr>
                <tr>
                  <td>Prędkość max (km/h)</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.maxForwardSpeed}</td>)}
                </tr>
                <tr>
                  <td>Prędkość max cofania (km/h)</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.maxBackwardSpeed}</td>)}
                </tr>
                <tr>
                  <td>Moc silnika (KM)</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.enginePower}</td>)}
                </tr>
                <tr>
                  <td>Waga (t)</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.weight}</td>)}
                </tr>
              </>
            )}
          </tbody>
        </Table>

        {/* Pancerz */}
        {tanks[0].specifications?.armor && (
          <>
            <h2 className="text-center text-white mt-5 mb-3">Pancerz (mm)</h2>
            <Table striped bordered hover variant="dark" className="mb-5">
              <thead>
                <tr>
                  <th>Element</th>
                  {tanks.map(tank => <th key={tank.tankId}>{tank.name}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Przód kadłuba</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.armor?.hullFront}</td>)}
                </tr>
                <tr>
                  <td>Bok kadłuba</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.armor?.hullSide}</td>)}
                </tr>
                <tr>
                  <td>Tył kadłuba</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.armor?.hullRear}</td>)}
                </tr>
                <tr>
                  <td>Przód wieży</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.armor?.turretFront}</td>)}
                </tr>
                <tr>
                  <td>Bok wieży</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.armor?.turretSide}</td>)}
                </tr>
                <tr>
                  <td>Tył wieży</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.armor?.turretRear}</td>)}
                </tr>
              </tbody>
            </Table>
          </>
        )}

        {/* Działo */}
        {tanks[0].specifications?.gun && (
          <>
            <h2 className="text-center text-white mt-5 mb-3">Działo</h2>
            <Table striped bordered hover variant="dark" className="mb-5">
              <thead>
                <tr>
                  <th>Parametr</th>
                  {tanks.map(tank => <th key={tank.tankId}>{tank.name}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nazwa</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.gun?.gunName}</td>)}
                </tr>
                <tr>
                    <td>Zapas amunicji</td>
                    {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.gun?.ammunitionCount}</td>)}
                </tr>
                <tr>
                  <td>Kaliber (mm)</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.gun?.caliber}</td>)}
                </tr>
                <tr>
                  <td>Przeładowanie (s)</td>
                  {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.gun?.reloadTime}</td>)}
                </tr>
                <tr>
                    <td>Wychylenie działa minimalne</td>
                    {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.gun?.verticalGuidance?.min}</td>)}
                </tr>
                <tr>
                    <td>Wychylenie działa maksymalne</td>
                    {tanks.map(tank => <td key={tank.tankId}>{tank.specifications?.gun?.verticalGuidance?.max}</td>)}
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </div>
  );
};

export default TankComparator;
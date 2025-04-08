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
  specifications?: TankSpecification;
}

interface TankSpecification {
  crewCount: number;
  maxForwardSpeed: number;
  maxBackwardSpeed: number;
  powerToWeightRatio: number;
  enginePower: number;
  weight: number;
  armor?: ArmorSpecification;
  gun?: GunSpecification;
}

interface ArmorSpecification {
  hullFront: number;
  hullSide: number;
  hullRear: number;
  turretFront: number;
  turretSide: number;
  turretRear: number;
}

interface GunSpecification {
  gunId: number;
  gunName: string;
  caliber: number;
  ammunitionCount: number;
  reloadTime: number;
  turretRotationSpeed: number;
  verticalGuidance?: VerticalGuidance;
  gunAmmunitions?: GunAmmunition[];
}

interface VerticalGuidance {
  min: number;
  max: number;
}

interface GunAmmunition {
  gunId: number;
  ammunitionId: number;
  gun?: GunSpecification;
  ammunition?: AmmunitionType;
}

interface AmmunitionType {
  ammunitionId: number;
  ammunitionName: string;
  ammunitionTypeName: string;
  caliber: number;
  projectileMass: number;
  muzzleVelocity: number;
  explosiveMassTNT: number;
  armorPenetration?: ArmorPenetration;
}

interface ArmorPenetration {
  m100_0s: number;
  m100_30s: number;
  m100_60s: number;
  m1000_0s: number;
  m1000_30s: number;
  m1000_60s: number;
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
  const [expandedAmmoIndexes, setExpandedAmmoIndexes] = useState<number[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5114/tanks/${id}`)
      .then((response) => {
        setTank(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Błąd ładowania danych:", error));
  }, [id]);

  const toggleAmmoDetails = (index: number) => {
    setExpandedAmmoIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  if (loading) return <div className="text-center mt-5 text-white">Ładowanie...</div>;
  if (!tank) return <div className="text-center mt-5 text-white">Błąd ładowania czołgu</div>;

  const gunAmmoList = (tank.specifications?.gun?.gunAmmunitions as any)?.$values ?? [];

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

          {tank.specifications && (
            <>
              <h3 className="text-center mt-4">Specyfikacje Pojazdu</h3>
              <Row className="mt-3">
                <Col md={4} className="info-box">
                  <span className="info-title">Załoga:</span>
                  <span className="info-value">{tank.specifications.crewCount}</span>
                </Col>
                <Col md={4} className="info-box">
                  <span className="info-title">Maks. prędkość:</span>
                  <span className="info-value">{tank.specifications.maxForwardSpeed} km/h</span>
                </Col>
                <Col md={4} className="info-box">
                  <span className="info-title">Prędkość wsteczna:</span>
                  <span className="info-value">{tank.specifications.maxBackwardSpeed} km/h</span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={4} className="info-box">
                  <span className="info-title">Moc silnika:</span>
                  <span className="info-value">{tank.specifications.enginePower} KM</span>
                </Col>
                <Col md={4} className="info-box">
                  <span className="info-title">Waga:</span>
                  <span className="info-value">{tank.specifications.weight} t</span>
                </Col>
                <Col md={4} className="info-box">
                  <span className="info-title">Moc/waga:</span>
                  <span className="info-value">{tank.specifications.powerToWeightRatio} KM/t</span>
                </Col>
              </Row>
            </>
          )}

          {tank.specifications?.armor && (
            <>
              <h3 className="text-center mt-4">Pancerz (mm)</h3>
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
                    <td>Przód</td>
                    <td>{tank.specifications.armor.hullFront}</td>
                    <td>{tank.specifications.armor.turretFront}</td>
                  </tr>
                  <tr>
                    <td>Bok</td>
                    <td>{tank.specifications.armor.hullSide}</td>
                    <td>{tank.specifications.armor.turretSide}</td>
                  </tr>
                  <tr>
                    <td>Tył</td>
                    <td>{tank.specifications.armor.hullRear}</td>
                    <td>{tank.specifications.armor.turretRear}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}

          {tank.specifications?.gun && (
            <>
              <h3 className="text-center mt-4">Działo</h3>
              <Row className="mt-3">
                <Col md={4} className="info-box">
                  <span className="info-title">Nazwa:</span>
                  <span className="info-value">{tank.specifications.gun.gunName}</span>
                </Col>
                <Col md={4} className="info-box">
                  <span className="info-title">Kaliber:</span>
                  <span className="info-value">{tank.specifications.gun.caliber} mm</span>
                </Col>
                <Col md={4} className="info-box">
                  <span className="info-title">Zapas amunicji:</span>
                  <span className="info-value">{tank.specifications.gun.ammunitionCount}</span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={4} className="info-box">
                  <span className="info-title">Czas przeładowania:</span>
                  <span className="info-value">{tank.specifications.gun.reloadTime} s</span>
                </Col>
                <Col md={4} className="info-box">
                  <span className="info-title">Prędkość obrotu wieży:</span>
                  <span className="info-value">{tank.specifications.gun.turretRotationSpeed} °/s</span>
                </Col>
                {tank.specifications.gun.verticalGuidance && (
                  <Col md={4} className="info-box">
                    <span className="info-title">Wychylenie działa:</span>
                    <span className="info-value">
                      {tank.specifications.gun.verticalGuidance.min}° / {tank.specifications.gun.verticalGuidance.max}°
                    </span>
                  </Col>
                )}
              </Row>

              {/* Sekcja Amunicji */}
              {gunAmmoList && gunAmmoList.length > 0 && (
                <>
                  <h4 className="text-center mt-4">Amunicja</h4>
                  {gunAmmoList.map((ammoItem: any, index: number) => (
                    ammoItem?.ammunition && (
                      <Card key={index} className="bg-dark text-white mb-3 shadow ammo-card">
                        <Card.Header
                          onClick={() => toggleAmmoDetails(index)}
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <span>
                            <strong>{ammoItem.ammunition.ammunitionName}</strong> ({ammoItem.ammunition.ammunitionTypeName})
                          </span>
                          <span>{expandedAmmoIndexes.includes(index) ? "▲" : "▼"}</span>
                        </Card.Header>

                        {expandedAmmoIndexes.includes(index) && (
                          <Card.Body>
                            <Row>
                              <Col md={4} className="info-box">
                                <span className="info-title">Masa pocisku:</span>
                                <span className="info-value">{ammoItem.ammunition.projectileMass} kg</span>
                              </Col>
                              <Col md={4} className="info-box">
                                <span className="info-title">Prędkość wylotowa:</span>
                                <span className="info-value">{ammoItem.ammunition.muzzleVelocity} m/s</span>
                              </Col>
                              <Col md={4} className="info-box">
                                <span className="info-title">Masa materiału wybuchowego:</span>
                                <span className="info-value">{ammoItem.ammunition.explosiveMassTNT} kg</span>
                              </Col>
                            </Row>

                            {ammoItem.ammunition.armorPenetration && (
                              <>
                                <h6 className="mt-4">Penetracja pancerza (mm)</h6>
                                <table className="table table-dark table-sm">
                                  <thead>
                                    <tr>
                                      <th>Odległość/Kąt</th>
                                      <th>0°</th>
                                      <th>30°</th>
                                      <th>60°</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>100 m</td>
                                      <td>{ammoItem.ammunition.armorPenetration.m100_0s}</td>
                                      <td>{ammoItem.ammunition.armorPenetration.m100_30s}</td>
                                      <td>{ammoItem.ammunition.armorPenetration.m100_60s}</td>
                                    </tr>
                                    <tr>
                                      <td>1000 m</td>
                                      <td>{ammoItem.ammunition.armorPenetration.m1000_0s}</td>
                                      <td>{ammoItem.ammunition.armorPenetration.m1000_30s}</td>
                                      <td>{ammoItem.ammunition.armorPenetration.m1000_60s}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </>
                            )}
                          </Card.Body>
                        )}
                      </Card>
                    )
                  ))}
                </>
              )}
            </>
          )}

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

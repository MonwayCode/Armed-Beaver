import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import NavScroll from "./NavSroll";
import "../styles.css";

interface Tank {
  tankId: number;
  name: string;
  jpgPath: string;
}

const Types: React.FC = () => {
  const { tanktype } = useParams<{ tanktype: string }>();
  const navigate = useNavigate();
  const [tanks, setTanks] = useState<Tank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const displayNames: Record<string, string> = {
    "light" : "Lekki",
    "medium" : "Średni",
    "heavy" : "Ciężki",
    "tk" : "Niszczyciel czołgów",
    "aa" : "Samobieżne działo przeciwlotnicze",
  };

  useEffect(() => {
    const fetchTanks = async () => {
      try {
        if (!tanktype) {
          throw new Error("Brak parametru typu");
        }

        setLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost:5114/type/${encodeURIComponent(tanktype.toLowerCase())}`);
        let data = response.data;

        if (data && data.$values && Array.isArray(data.$values)) {
          data = data.$values;
        }

        if (!Array.isArray(data)) {
          throw new Error("Nieprawidłowy format danych z serwera");
        }

        setTanks(data);
      } catch (err) {
        console.error("Błąd podczas pobierania czołgów:", err);
        setError(err instanceof Error ? err.message : "Nie udało się załadować danych czołgów");
      } finally {
        setLoading(false);
      }
    };

    fetchTanks();
  }, [tanktype]);

  const displayTankTypeName = tanktype
  ? displayNames[tanktype.toLowerCase()] ?? `Nieznany typ (${tanktype})`
  : "Nieznany typ";


  if (!tanktype) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">
          <Alert.Heading>Błąd</Alert.Heading>
          <p>Brak parametru typu czołgu</p>
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">
          <Alert.Heading>Błąd</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="App" style={{ backgroundColor: "#1d3b35", minHeight: "100vh" }}>
      <NavScroll />
      <div className="container mt-4">
        <h2 className="text-white text-center mb-4">
          Czołgi typu: {displayTankTypeName}
        </h2>

        <div className="row">
          {tanks.length > 0 ? (
            tanks.map((tank) => <TankPanel key={tank.tankId} tank={tank} />)
          ) : (
            <div className="col-12">
              <Alert variant="info" className="text-center">
                Brak czołgów dla wybranego typu
              </Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TankPanel = ({ tank }: { tank: Tank }) => {
  const navigate = useNavigate();

  return (
    <div className="col-md-4 mb-3">
      <div
        className="tank-panel p-3 shadow rounded"
        style={{
          backgroundImage: `url(${tank.jpgPath})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          borderRadius: "10px",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={() => navigate(`/tank/${tank.tankId}`)}
      >
        <div
          className="bg-dark bg-opacity-50 text-white text-center rounded"
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            padding: "5px",
          }}
        >
          <h5 className="mb-0">{tank.name}</h5>
        </div>
      </div>
    </div>
  );
};

export default Types;

import React, { useState, useEffect } from 'react';

interface FunFact {
  informationId: number;
  funfact: string;
}

const FunFactSection: React.FC = () => {
  const [funFact, setFunFact] = useState<FunFact | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomFunFact = async () => {
      try {
        const response = await fetch('http://localhost:5114/informations/random');
        
        if (!response.ok) {
          throw new Error('Nie udało się załadować ciekawostki');
        }

        const data: FunFact = await response.json();
        setFunFact(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
      }
    };

    fetchRandomFunFact();

    const interval = setInterval(fetchRandomFunFact, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-5 text-center p-4 shadow rounded">
      <h2 className="mb-3">Ciekawostka</h2>
      {funFact && (
        <p className="lead">
          {funFact.funfact}
        </p>
      )}
    </section>
  );
};

export default FunFactSection;
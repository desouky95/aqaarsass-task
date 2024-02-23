import { useNavigate } from "react-router-dom";
import { Card } from "../../core/components/Card/Card";
import { namedRoutes } from "../../router/routes";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-4 lg:grid-cols-6 px-4 py-8">
      {namedRoutes.map((route) => {
        return (
          <Card key={route.path} onClick={() => navigate(route.path)}>
            <Card.Title>{route.title}</Card.Title>
            <img alt={route.title} src="/chart.svg" />
          </Card>
        );
      })}
    </div>
  );
};

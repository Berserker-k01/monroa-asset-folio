import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Shield, Zap, Globe } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (!loading && !user) {
    navigate("/auth");
    return null;
  }

  const features = [
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Vos données sont protégées avec les meilleures technologies de sécurité",
    },
    {
      icon: Zap,
      title: "Rapide",
      description: "Interface moderne et réactive pour une gestion efficace",
    },
    {
      icon: Globe,
      title: "Accessible",
      description: "Application PWA utilisable sur tous vos appareils, même hors ligne",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 animate-fade-in text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6 shadow-lg">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            MonRoa Gestion
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simplifiez la gestion de vos biens, où que vous soyez
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              À propos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              MonRoa Gestion est une application moderne conçue pour les propriétaires et gestionnaires 
              qui souhaitent suivre facilement leur patrimoine immobilier et mobilier.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Que vous gériez des maisons, des terrains, des véhicules ou des boutiques, MonRoa vous 
              offre une solution intuitive pour centraliser toutes vos informations en un seul endroit.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Pensée spécialement pour les besoins des utilisateurs en Afrique, l'application propose 
              une interface simple, rapide et accessible depuis n'importe quel appareil.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Fonctionnalités
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">
                  Gestion complète de vos biens (ajout, modification, suppression)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">
                  Suivi des statuts (disponible, loué, en maintenance, etc.)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">
                  Recherche et filtres avancés pour retrouver rapidement vos biens
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">
                  Tableau de bord avec statistiques et vue d'ensemble
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">
                  Application PWA installable sur mobile, tablette et ordinateur
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">
                  Interface responsive et optimisée pour tous les écrans
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>MonRoa Gestion © 2025 - Une application pensée pour vous</p>
        </div>
      </main>
    </div>
  );
};

export default About;
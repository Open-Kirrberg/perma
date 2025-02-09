import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  img: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Permakultur Grundlagen",
    Svg: require("@site/static/img/permaculture_basics.jpeg").default,
    img: "img/permaculture_basics.jpeg",
    description: (
      <>
        Entdecke die Grundlagen der Permakultur und erfahre, wie du nachhaltige
        Lebensräume gestalten kannst, die im Einklang mit der Natur stehen.
      </>
    ),
  },
  {
    title: "Pflanzen Wiki",
    Svg: require("@site/static/img/permaculture_basics.jpeg").default,
    img: "img/wiki.jpeg",
    description: (
      <>
        Erkunde unser umfangreiches Pflanzen Wiki mit allen Pflanzenarten, die
        auf unseren Permakultur-Flächen zu finden sind. Finde Anbauhinweise,
        Pflegetipps und mehr!
      </>
    ),
  },
  {
    title: "Flächenübersicht der Permakultur Gärten",
    Svg: require("@site/static/img/permaculture_basics.jpeg").default,
    img: "img/areas.jpeg",
    description: (
      <>
        Schau dir die Übersicht unserer Permakultur-Gärten an und entdecke die
        Bepflanzungshistorie sowie spannende Geschichten hinter jedem Garten.
      </>
    ),
  },
];

function Feature({ title, Svg, img, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
        <img src={img} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

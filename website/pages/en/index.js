/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const Bootstrap = require('react-bootstrap')
const siteConfig = require(process.cwd() + '/siteConfig.js');
const CortexMovie = siteConfig.baseUrl + 'img/cortex-movie.mp4';

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const HomeContainer = props => (
      <div className="homeContainer">
        {props.children}
      </div>
    );

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    class Hero extends React.Component {
      render() {
        return <div className="hero">{this.props.children}</div>;
      }
    }

    class HeaderHero extends React.Component {
      render() {
        return (
          <Hero>
            <video className="hero-video" playsInline autoPlay muted>
                <source src={CortexMovie} type="video/mp4" />
            </video>
            <div style={{width: "100%", height: "100%", position: "absolute", top: 0, zIndex: -1, backgroundColor: "rgba(0,0,0,1)"}}></div>
            <div className="hero-body">
              <br></br><br></br>
              <div className="text">Build Security</div>
              <div className="minitext">
                using the most advanced cybersecurity data platform
              </div>
            </div>
            <br></br>
            <Bootstrap.Button style={{ position: 'relative' }} variant="outline-light">
              Sign up for early access
            </Bootstrap.Button>
          </Hero>
        );
      }
    }

    return (
      <HomeContainer>
        <HeaderHero/>
      </HomeContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content:
              'Build on what’s happening in your cloud, endpoint & network.',
            image: `${baseUrl}img/why-develop.png`,
            imageAlign: 'left',
            title: 'Why Develop on Cortex?',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'This is another description of how this project is useful',
            image: `${baseUrl}img/undraw_note_list.svg`,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content: 'Quickly get started developing your own applications on Cortex.',
            image: `${baseUrl}img/start-developing.png`,
            imageAlign: 'right',
            title: 'Start developing with Cortex',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="threeColumn">
        {[
          {
            content: 'An open, continuous security platform to integrate rich context from cloud, endpoint and network data with global threat intelligence into every enterprise product, delivering better together experiences.',
            image: `${baseUrl}img/what-is-cortex.png`,
            imageAlign: 'top',
            title: 'What is Cortex?',
          },
          {
            content: 'Increase your speed to market by avoiding the deployment of cloud, endpoint and network agents at your customers. Expand your value prop with threat intel in your product. Access 60,000+ customers worldwide.',
            image: `${baseUrl}img/why-cortex.png`,
            imageAlign: 'top',
            title: 'Why Develop on Cortex?',
          },
          {
            content: 'Learn about use cases that our customers are looking for. Or create new scenarios that change how enterprises will see your product.',
            image: `${baseUrl}img/cortex-use-cases.png`,
            imageAlign: 'top',
            title: 'Cortex Use Cases',
          },
        ]}
      </Block>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
      </div>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <LearnHow />
          <TryOut />
          <Description />
        </div>
      </div>
    );
  }
}

module.exports = Index;

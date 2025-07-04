import BibleReader from "../../components/BibleReader/BibleReader";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";


function BibleLanding() {
  return (
    <>
      <Header />
      <main>
        <BibleReader />
      </main>
      <Footer />
    </>
  );
}

export default BibleLanding;
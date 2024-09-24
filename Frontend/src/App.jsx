import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import SignupButton from "./components/SignupButton";
import Footer from "./components/Footer";
import "./global.css";  // Assuming you've created the global.css file

function App() {
    return (
        <>
            <Header />
            
            {/* Add a div with class "main-content" to ensure footer is pushed to bottom */}
            <div className="main-content">
                {/* Your content goes here */}
                
            </div>

            <Footer />
        </>
    );
}

export default App;

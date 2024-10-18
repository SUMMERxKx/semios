import './Main.css';
import { assets } from '../../assets/assets';
import { useContext, useEffect } from 'react';
import { Context } from '../../context/Context';

const Main = () => {
  const prompt1 = "What is Remitly ?";
  const prompt2 = "What is the history of Remitly";
  const prompt3 = "How does Remitly transfer money";
  const prompt4 = "Is Remitly secure?";

  const { onSent, recentPrompt, showResult, resultData, setInput, input, loading } = useContext(Context);

  const handleEnterKey = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEnterKey);
    return () => {
      window.removeEventListener('keydown', handleEnterKey);
    };
  }, [input]); // Dependency added for input

  const handleCardClick = (prompt) => {
    setInput(prompt); // Just set input, form handles submission
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (input.trim()) {
      await onSent();
      setInput(''); // Clear input after submission
    }
  };

  return (
    <div className='main'>
      <div className="nav">
        <p>Remitly</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

      {!showResult ? (
        <>
          <div className="greet">
              <p><span>Hello, User.</span></p>
              <p>Welcome to the Remitly ChatBot</p>
          </div>
          <div className="cards">
              <div className="card" onClick={() => handleCardClick(prompt1)}>
                  <p>{prompt1}</p>
                  <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick(prompt2)}>
                  <p>{prompt2} </p>
                  <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick(prompt3)}>
                  <p> {prompt3} </p>
                  <img src={assets.message_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick(prompt4)}>
                  <p>{prompt4} </p>
                  <img src={assets.code_icon} alt="" />
              </div>
          </div>
        </>
      ) : (
        <div className='result'>
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading ? (
              <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
            ) : (
              <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
            )}
          </div>
        </div>
      )}

        <form onSubmit={handleSubmit} className="main-bottom">
            <div className="search-box">
                <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    {input ? <button style={{ border: 'none' }} type="submit"><img src={assets.send_icon} alt="" /></button> : null}
                </div>
            </div>
            <p className="bottom-info">
                ChatBot may display inaccurate info, including about people, so double-check its responses.
            </p>
        </form>
      </div>
    </div>
  );
};

export default Main;

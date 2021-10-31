
import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import * as mestoAuth from '../utils/mestoAuth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import { api } from '../utils/api';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip.js';
import Spinner from './Spinner.js';
function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [registerStatus, setRegisterStatus] = useState({ message: '', status: false });
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialInfo(), api.getInitialCards()])
        .then(([info, cardsArr]) => {
          setCurrentUser(info);
          setCards(cardsArr);
          setIsLoading(false);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mestoAuth.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push('/');
        })
        .catch(err => console.log(err));
    }
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }
  function handleSubmitDeleteCard(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  function handleCardDelete(card) {
    setCardToDelete(card);
    setDeletePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleUpdateUser(info) {
    api.setUserInfo(info)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  function handleUpdateAvatar(link) {
    api.setUserAvatar(link)
      .then(info => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  function handleAddPlaceSubmit(card) {
    api.createNewCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  function handleLogin(username, password) {
    mestoAuth.authorize(username, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => console.log(err));
  }
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setUserEmail('');
    setLoggedIn(false);
  }
  function handleRegister(username, password) {
    mestoAuth.register(username, password)
      .then(() => {
        history.push('/sign-in');
        setRegisterStatus({ message: 'Вы успешно зарегистрировались!', status: 'true' });
      })
      .catch(() => {
        setRegisterStatus({ message: 'Что-то пошло не так! Попробуйте ещё раз.', status: 'false' })
      })
    setIsInfoTooltipOpen(true);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} handleSignOut={handleSignOut} />
        <Switch>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn} component={isLoading ? Spinner : Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <DeleteCardPopup isOpen={isDeletePopupOpen} onClose={closeAllPopups} onDeleteCard={handleSubmitDeleteCard} card={cardToDelete} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} registerStatus={registerStatus} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

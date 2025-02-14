import React, { useContext, useEffect } from "react";
import { Content, Container } from "./styles";
import { HeaderComponent, FooterComponent, ModalComponent } from "components";
import { GlobalContext, DispatchTypes } from "context";
import { createDoc } from "services";
import { setUserSession, getUserSession } from "config/localStorage";
import { checkCredentials } from "services";
import { withRouter } from "react-router";

const Master = ({
  children,
  footer = true,
  title,
  subTitle,
  allowSignOut,
  history,
}) => {
  const context = useContext(GlobalContext);
  const [modalState] = context.globalModal;
  const [userState, userDispatch] = context.globalUser;

  const setDoc = async (user) => {
    try {
      const { jsonFile, spreadsheetId } = user;
      const newDoc = await createDoc(jsonFile, spreadsheetId);
      setUserSession(user);
      userDispatch({
        type: DispatchTypes.User.GET_DOC_SUCCESS,
        doc: newDoc,
      });
    } catch (error) {
      userDispatch({
        type: DispatchTypes.User.GET_DOC_ERROR,
        error,
      });
    }
  };

  const checkUser = async (user) => {
    const { spreadsheetId, jsonFile } = user;
    const valid = await checkCredentials(jsonFile, spreadsheetId);
    if (valid) {
      userDispatch({
        type: DispatchTypes.User.GET_DOC_START,
      });
      setDoc(user);
    } else {
      history.push("/onboarding");
    }
  };

  useEffect(() => {
    if (userState) {
      const { user, doc, loading } = userState;
      if (user && !loading && doc === null) {
        checkUser(user);
      }
    }
  }, [userState]);

  useEffect(() => {
    const userFromStorage = getUserSession();
    if (userFromStorage) {
      userDispatch({
        type: DispatchTypes.User.SET_USER_SUCCESS,
        user: userFromStorage,
      });
    } else {
      history.push("/onboarding");
    }
  }, [history, userDispatch]);

  return (
    <Container footer={footer}>
      <Content>{children}</Content>
      <HeaderComponent
        title={title}
        subTitle={subTitle}
        allowSignOut={allowSignOut}
      />
      {footer && <FooterComponent />}
      {modalState.show && (
        <ModalComponent
          title={modalState.title}
          content={modalState.content}
          actions={modalState.actions}
        />
      )}
    </Container>
  );
};

export default withRouter(Master);

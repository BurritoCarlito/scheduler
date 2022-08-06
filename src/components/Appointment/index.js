import React from "react";
import "./styles.scss";
import "components/Appointment";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  function deleteAppointment() {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
           />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save} />
      )}
      {mode === SAVING && (
        <Status message={"Saving"} />
      )}
      {mode === CONFIRM && (
        <Confirm onCancel={() => back ()} onConfirm={deleteAppointment} message={"Are you sure you would like to delete the appointment?"} />
      )}
      {mode === DELETING && (
        <Status message={"Deleting"} />
      )}
      {mode === EDIT && (
        <Form 
        student={props.interview.student} 
        interviewer={props.interview.interviewer}
        interviewers={props.interviewers}
        onSave={save} 
        onCancel={() => back(SHOW)}
         />
      )}
    </article>
  );
}
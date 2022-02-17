import React from "react";

import VoteTable from "./VoteTable";
import VoteForm from "./VoteForm";
import { Row, Col } from 'antd'

const VoteWrapper = (props) => {
  return (
    <div>
      <Row>
        <Col span={24}>
          <VoteTable votes={props.candidates} />
        </Col>
      </Row>
      <Row>
        <Col>
          {props.isVoted ? (
            <div>You have Voted for ${ props.renderSelectedCandidate(props.selectCandidate).name }</div>
          ) : (
            <VoteForm
              options={props.options}
              selectedCandidate={props.selectedCandidate}
              selectCandidate={props.selectCandidate}
              termsAccepted={props.termsAccepted}
              toggleTermsConfirmation={props.toggleTermsConfirmation}
              handleSubmit={props.handleSubmit}
              formErrors={props.formErrors}
              setFormErrors={props.setFormErrors}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default VoteWrapper;

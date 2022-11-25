import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Settings1 from "./Settings1";
import Settings2 from "./Settings2";
import DenseTable from "./MisClasesTabla";

function SettingsArea(props) {
  const { pushMessageToSnackbar } = props;
  return (
    <Fragment>
      <DenseTable pushMessageToSnackbar={pushMessageToSnackbar} />
    </Fragment>
    
  );
}

SettingsArea.propTypes = {
  pushMessageToSnackbar: PropTypes.func
};

export default SettingsArea;

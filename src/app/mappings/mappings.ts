import { renderSetting } from '../../coolearning/utils/render-setting';
import { notifications } from '../ui/notifications';

export const mappings = Object.create (null);

mappings.isLearning = false;
mappings.learningParameter = null;
mappings.controlByParameter = {};
mappings.parametersByControl = {};

mappings.state = {
  get state () {
    return {
      isLearning: this.isLearning,
      learningParameter: this.learningParameter,
      controlByParameter: this.controlByParameter,
      parametersByControl: this.parametersByControl,
    };
  },
};

type LearnOptions = {
  parameter: string;
  control: number;
  type: string;
}

/**
 * Learn a mapping between a parameter and a control.
 *
 * @param {LearnOptions} options - The options for learning.
 */
mappings.learn = function ({
  parameter,
  control,
  type,
}: LearnOptions) {
  if (this.isMapped (parameter)) {
    return;
  }

  this.setParameterMaps ({
    parameter,
    control,
    type,
  });

  this.disableLearningMode ();

  renderSetting ({
    parameter,
    control,
    type,
  });

  notifications.notify (
    `Learn: control ${control} for ${parameter} (${type})`,
  );
};

/**
 * Unlearn a mapping between a parameter and a control.
 *
 * @param {string} parameter - The parameter to unlearn.
 */
mappings.unlearn = function (parameter: string) {
  if (!this.isMapped (parameter)) {
    return;
  }

  this.unsetParameterMaps (parameter);

  renderSetting ({ parameter });

  notifications.notify (
    `${parameter} unlearned`,
  );

  // saveState ();
};

/**
 * Enable learning mode.
 *
 * @param {string} newLearningParameter - The parameter to learn.
 */
mappings.enableLearningMode = function (newLearningParameter: string) {
  this.isLearning = true;
  this.learningParameter = newLearningParameter;
};

/**
 * Disable learning mode.
 */
mappings.disableLearningMode = function () {
  this.isLearning = false;
  this.learningParameter = null;
};

/**
 * Set the parameter and control maps.
 *
 * @param {LearnOptions} options - The options for learning.
 */
mappings.setParameterMaps = function ({
  parameter,
  control,
  type,
}: LearnOptions) {
  // map
  this.controlByParameter[parameter] = {
    control,
    type,
  };

  // reverse map
  if (this.controlByParameter[control] === undefined) {
    this.controlByParameter[control] = [parameter];
  } else {
    this.controlByParameter[control].push (parameter);
  }
};

/**
 * Unset the parameter and control maps.
 *
 * @param {string} parameter - The parameter to unset.
 */
mappings.unsetParameterMaps = function (parameter: string) {
  // unmap
  delete this.controlByParameter[parameter];

  // reverse unmap
  const { control } = this.controlByParameter[parameter];
  const parameters = this.parametersByControl[control];

  if (parameters.length === 1) {
    delete this.parametersByControl[control];
  } else {
    const index = parameters.indexOf (parameter);
    if (index !== -1) {
      parameters.splice (index, 1);
    }
  }
};

/**
 * Check if a parameter is mapped.
 *
 * @param {string} parameter - The parameter to check.
 * @returns {boolean} - True if the parameter is mapped.
 */
mappings.isMapped = function (parameter: string): boolean {
  return this.controlByParameter[parameter] !== undefined;
};

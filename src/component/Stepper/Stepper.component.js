// import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './Stepper.style';

export class Stepper extends PureComponent {
  static propTypes = {
    // TODO: implement prop-types
  };

  state = {
    visited: [],
    condition: {},
  };

  componentDidMount() {
    const { currentStep, allSteps } = this.props;

    if (allSteps.indexOf(currentStep) !== 0) {
      const completed = allSteps.slice(0, allSteps.indexOf(currentStep)); //array of completed steps

      const condition = completed.reduce((acc, curr) => {
        acc[curr] = true;
        return acc;
      }, {});

      this.setState({
        visited: [...completed, currentStep],
        condition: {
          ...condition,
          [currentStep]: false,
        },
      });
    } else {
      this.setState({
        visited: [currentStep],
        condition: {
          [currentStep]: false,
        },
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentStep !== this.props.currentStep) {
      const visited = [...this.state.visited, this.props.currentStep];
      const newCondition = Object.keys(this.state.condition).reduce(
        (object, current) => {
          object[current] = true;
          return object;
        },
        {}
      );

      const condition = {
        ...newCondition,
        [this.props.currentStep]: false,
      };

      this.setState({ visited });
      this.setState({ condition });
    }
  }

  render() {
    const { stepTitles, currentStep, lastStep } = this.props;

    return (
      <div block='Stepper'>
        {stepTitles.map((stepItem, index) => {
          const text = stepItem.title.split(/\s+/)[0];
          const visitedTag = this.state.visited.includes(stepItem.key)
            ? ' visited'
            : '';
          const completedTag = this.state.condition[stepItem.key]
            ? ' completed'
            : '';

          return (
            <>
              <div block='Stepper__base'>
                <div block={`Stepper__progress${visitedTag}`} />
              </div>

              <div block={`Stepper__step${visitedTag}`}>
                <span block={`Stepper__index${visitedTag}${completedTag}`}>
                  {index + 1}
                </span>
                <p block='Stepper__text'>{text}</p>
              </div>
            </>
          );
        })}

        <div block='Stepper__base'>
          <div
            block={`Stepper__progress${
              lastStep === currentStep ? ' visited' : ''
            }`}
          />
        </div>
      </div>
    );
  }
}

export default Stepper;

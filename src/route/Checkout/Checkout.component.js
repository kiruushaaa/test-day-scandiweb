import { Checkout as SourceCheckout } from 'SourceRoute/Checkout/Checkout.component';
import {
  BILLING_STEP,
  DETAILS_STEP,
  SHIPPING_STEP,
} from 'SourceRoute/Checkout/Checkout.config';
import ContentWrapper from 'Component/ContentWrapper';
import Stepper from 'Component/Stepper';

export class Checkout extends SourceCheckout {
  renderStepper() {
    const stepTitles = Object.keys(this.stepMap).reduce((list, listKey) => {
      if (listKey === DETAILS_STEP) return list;

      list.push({ title: this.stepMap[listKey].title, key: listKey });

      return list;
    }, []);

    const allSteps = [SHIPPING_STEP, BILLING_STEP, DETAILS_STEP];

    return (
      <Stepper
        stepTitles={stepTitles}
        currentStep={this.props.checkoutStep}
        lastStep={DETAILS_STEP}
        allSteps={allSteps}
      />
    );
  }

  render() {
    return (
      <main block='Checkout'>
        {this.renderStepper()}
        <ContentWrapper
          wrapperMix={{ block: 'Checkout', elem: 'Wrapper' }}
          label={__('Checkout page')}>
          {this.renderSummary(true)}
          <div block='Checkout' elem='Step'>
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    );
  }
}

export default Checkout;

import React, { Component } from 'react';
import './Shipping.css';
import {
  FormWithConstraints,
  FieldFeedback
} from 'react-form-with-constraints';
import {
  FieldFeedbacks,
  FormGroup,
  FormControlLabel,
  FormControlInput
} from 'react-form-with-constraints-bootstrap4';
import { countries, regions } from './CountriesAndRegions';

class Shipping extends Component {
  constructor() {
    super();
    this.updateShippingInfo = this.updateShippingInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      country: '',
      region: '',
      zipPostCode: '',
      email: '',
      phone: '',
      submitButtonDisabled: false
    };
  }

  updateShippingInfo = event => {
    let field = event.target.id;
    let val = event.target.value;
    this.setState({ [field]: val });

    if (field === 'country') {
      this.setState({ region: '' });
      this.setState({ zipPostCode: '' });
    }
  };

  handleChange(e) {
    const target = e.currentTarget;
    this.form.validateFields(target);
    this.setState({
      [target.name]: target.value,
      submitButtonDisabled: !this.form.isValid()
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.form.validateFields();
    this.setState({ submitButtonDisabled: !this.form.isValid() });
    if (this.form.isValid()) {
      let shippingInfo = this.state;
      // submitButtonDisabled is UI state, not data, so it should not be submitted
      delete shippingInfo.submitButtonDisabled;
      this.props.createOrder(shippingInfo);
      this.props.history.push('/thanks');
    }
  }

  render() {
    let regionsForSelectedCountry = regions[this.state.country];
    let minLength = 0;
    let pattern,
      placeholder = '';
    let zipPostCodeLabel = 'Code';
    switch (this.state.country) {
      case 'canada':
        pattern = '([A-Za-z][0-9][A-Za-z]\\s?[0-9][A-Za-z][0-9])';
        placeholder = 'A0A 0A0';
        zipPostCodeLabel = 'Postal Code (A0A 0A0)';
        minLength = 6;
        break;
      case 'usa':
        pattern = '(\\d{5})';
        placeholder = '11111';
        zipPostCodeLabel = 'Zip Code (11111)';
        minLength = 5;
        break;
    }

    return (
      <FormWithConstraints
        ref={formWithConstraints => (this.form = formWithConstraints)}
        onSubmit={this.handleSubmit}
      >
        <FormGroup for="firstName">
          <FormControlLabel htmlFor="firstName">First Name: </FormControlLabel>
          <FormControlInput
            type="text"
            value={this.state[this.id]}
            onChange={this.updateShippingInfo}
            id="firstName"
            required
            placeholder="First Name"
          />
        </FormGroup>
        <FormGroup for="lastName">
          <FormControlLabel htmlFor="lastName">Last Name: </FormControlLabel>
          <FormControlInput
            type="text"
            value={this.state[this.id]}
            onChange={this.updateShippingInfo}
            id="lastName"
            required
            placeholder="Last Name"
          />
        </FormGroup>
        <FormGroup for="email">
          <FormControlLabel htmlFor="email">Email Address: </FormControlLabel>
          <FormControlInput
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
            placeholder="you@company.com"
            minLength="6"
          />
          <FieldFeedbacks for="email">
            <FieldFeedback when="tooShort">Too short</FieldFeedback>
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </FormGroup>

        <FormGroup for="phone">
          <FormControlLabel htmlFor="phone">
            Phone Number (4165556789):{' '}
          </FormControlLabel>
          <FormControlInput
            type="tel"
            id="phone"
            name="phone"
            pattern="\d{10}"
            value={this.state.phone}
            onChange={this.handleChange}
            required
            minLength="10"
            placeholder="4165556789"
          />
          <FieldFeedbacks for="phone">
            <FieldFeedback when="tooShort">Too short</FieldFeedback>
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </FormGroup>
        <FormGroup for="address">
          <FormControlLabel htmlFor="address">Address: </FormControlLabel>
          <FormControlInput
            type="text"
            value={this.state[this.id]}
            onChange={this.updateShippingInfo}
            required
            id="address"
            placeholder="123 Main St."
          />
        </FormGroup>

        <FormGroup for="city">
          <FormControlLabel htmlFor="city">City: </FormControlLabel>
          <FormControlInput
            type="text"
            value={this.state[this.id]}
            onChange={this.updateShippingInfo}
            required
            id="city"
            placeholder="City"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel htmlFor="country">Country: </FormControlLabel>
          <select
            value={this.state.country}
            onChange={this.updateShippingInfo}
            required
            name="country"
            id="country"
          >
            <option value="">Select a country</option>
            {countries.map(country => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <FieldFeedbacks for="country">
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </FormGroup>

        <FormGroup>
          <FormControlLabel htmlFor="provState">
            {this.state.country === 'canada' ? 'Province' : 'State'}:{' '}
          </FormControlLabel>
          <select
            value={this.state.region}
            required
            onChange={this.updateShippingInfo}
            id="region"
          >
            <option value="">
              Select a {this.state.country === 'canada' ? 'province' : 'state'}
            </option>
            {regionsForSelectedCountry && regionsForSelectedCountry.length > 0
              ? regionsForSelectedCountry.map(region => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))
              : null}
          </select>
          <FieldFeedbacks for="country">
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </FormGroup>

        <FormGroup for="zipPostCode">
          <FormControlLabel htmlFor="zipPostCode">
            {zipPostCodeLabel}:{' '}
          </FormControlLabel>
          <FormControlInput
            type="text"
            onChange={this.handleChange}
            id="zipPostCode"
            name="zipPostCode"
            pattern={pattern}
            value={this.state.zipPostCode}
            required
            minLength={minLength}
            placeholder={placeholder}
          />
          <FieldFeedbacks for="zipPostCode">
            <FieldFeedback when="tooShort">Too short</FieldFeedback>
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </FormGroup>
        <FormGroup>
          <FormControlLabel htmlFor="specialInstructions">
            Special Instructions:
          </FormControlLabel>
          <textarea
            value={this.state[this.id]}
            onChange={this.updateShippingInfo}
            id="specialInstructions"
            rows="3"
            placeholder="Anything we should know about?"
          />
        </FormGroup>

        {/* Button remains disabled until the form is valid */}
        <button disabled={this.state.submitButtonDisabled} type="submit">
          Complete Order
        </button>
      </FormWithConstraints>
    );
  }
}

export default Shipping;

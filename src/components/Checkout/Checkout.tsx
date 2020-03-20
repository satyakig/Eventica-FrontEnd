import React, { FormEvent, useState, Fragment } from 'react';
import { loadStripe, StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { checkoutStyles } from './Checkout.styles';

const stripePromise = loadStripe('pk_test_kuFLQ2mQfPphCYp5QYPzbtBP00am9FDgQA');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#212529',
      fontFamily: '"Source Code Pro", monospace',
      fontSmoothing: 'antialiased',
      fontSize: '15px',
      textTransform: 'lowercase',
      '::placeholder': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#ff165d',
    },
  },
};

interface CheckoutFormProps {
  amount: number;
  submit: () => void;
}

const CheckoutForm = (props: CheckoutFormProps) => {
  const classes = checkoutStyles();

  const [error, setError] = useState<string | undefined>('No card info');
  const stripe = useStripe();
  const elements = useElements();

  function handleStripeChange(event: StripeCardElementChangeEvent) {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(undefined);
    }
  }

  async function handleStripeSubmit(event: FormEvent) {
    event.preventDefault();

    if (elements && stripe) {
      const card = elements.getElement(CardElement);

      if (card) {
        const result = await stripe.createToken(card);

        if (result.error) {
          setError(result.error.message);
        } else {
          setError(undefined);
          props.submit();
        }
      }
    }
  }

  return (
    <Fragment>
      <DialogContent>
        <FormControl fullWidth={true}>
          <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleStripeChange} />
          <Typography className={classes.error} variant="caption">
            {error}
          </Typography>
        </FormControl>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          onClick={handleStripeSubmit}
          variant="contained"
          disabled={Boolean(error)}
          className={classes.pay}
        >
          pay ${props.amount}
        </Button>
      </DialogActions>
    </Fragment>
  );
};

interface CheckoutDialogProps {
  amount: number;
  open: boolean;
  handleClose: (status: boolean) => void;
}

const CheckoutDialog = (props: CheckoutDialogProps) => {
  const classes = checkoutStyles();

  function onClose() {
    props.handleClose(false);
  }

  function submit() {
    props.handleClose(true);
  }

  return (
    <Dialog
      open={props.open}
      fullWidth={true}
      onClose={onClose}
      disableBackdropClick={false}
      disableEscapeKeyDown={false}
    >
      <IconButton className={classes.closeButton} onClick={onClose} color="secondary">
        <CloseIcon />
      </IconButton>
      <DialogTitle className={classes.title}>Payment</DialogTitle>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={props.amount} submit={submit} />
      </Elements>
    </Dialog>
  );
};

export default CheckoutDialog;

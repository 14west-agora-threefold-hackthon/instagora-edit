// import React, { useState, useEffect, useCallback } from 'react';

import styled, { keyframes } from 'styled-components'
import {Spinner3 as Spinner} from 'styled-icons/evil'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const SpinningIcon = styled(Spinner)`
  animation: 2s linear ${spin} infinite;
  max-width: 2rem;
`

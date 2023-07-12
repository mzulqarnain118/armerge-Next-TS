import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { Circles } from 'react-loader-spinner';
// import { ScaleLoader } from 'react-spinners';

interface LoaderSpinnerProps {
  isLoading: boolean;
  color?: string;
}

export const LoaderSpinner: React.FC<LoaderSpinnerProps> = ({ isLoading, color }) => {
  return (
    <LoadingOverlay
      active={isLoading}
      spinner={<Circles color={color ?? '#43ACCB'} />}
    />
  );
};

// interface SpinnerProps {
//   isLoading: boolean;
//   color?: string;
// }

// export const Spinner: React.FC<SpinnerProps> = ({ isLoading, color }) => {
//   return (
//     <ScaleLoader
//       // css={override}
//       size={250}
//       color={color ?? '#43ACCB'}
//       loading={isLoading}
//     />
//   );
// };




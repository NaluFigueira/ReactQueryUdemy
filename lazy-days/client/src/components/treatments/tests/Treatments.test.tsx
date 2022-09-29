import { screen } from '@testing-library/react';
import { mockTreatments } from 'mocks/mockData';
import { renderWithQueryClient } from 'test-utils';

import { Treatments } from '../Treatments';

test('renders response from query', async () => {
  renderWithQueryClient(<Treatments />);

  const treatmentsNames = mockTreatments.map((treatment) => treatment.name);

  const treatmentsNamesRegex = new RegExp(treatmentsNames.join('|'), 'i');

  const treatmentTitles = await screen.findAllByRole('heading', {
    name: treatmentsNamesRegex,
  });

  expect(treatmentTitles).toHaveLength(treatmentsNames.length);
});

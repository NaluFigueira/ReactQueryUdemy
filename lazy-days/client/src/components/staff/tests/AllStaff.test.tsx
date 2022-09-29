import { screen } from '@testing-library/react';
import { mockStaff } from 'mocks/mockData';
import { renderWithQueryClient } from 'test-utils';

// import { rest } from 'msw';
// import { defaultQueryClientOptions } from '../../../react-query/queryClient';
// import { server } from '../../../mocks/server';
// import { renderWithClient } from '../../../test-utils';
import { AllStaff } from '../AllStaff';

test('renders response from query', async () => {
  renderWithQueryClient(<AllStaff />);

  const staffNames = mockStaff.map((staff) => staff.name);

  const staffNamesRegex = new RegExp(staffNames.join('|'), 'i');

  const staffTitles = await screen.findAllByRole('heading', {
    name: staffNamesRegex,
  });

  expect(staffTitles).toHaveLength(staffNames.length);
});

test('handles query error', async () => {
  // (re)set handler to return a 500 error for staff
  // server.resetHandlers(
  //   rest.get('http://localhost:3030/staff', (req, res, ctx) => {
  //     return res(ctx.status(500));
  //   }),
  // );
});

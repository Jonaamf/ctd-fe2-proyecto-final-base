import { screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../mocks/server';
import { render } from '../../test-utils';
import Cita from './Cita';

//Prueba Test

test("renderizar componentes", () => {
  render(<Cita />);

  const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
  const button = screen.getByText(/Obtener cita/i);
  const buttonDelete = screen.getByText(/Borrar/i);

  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(buttonDelete).toBeInTheDocument();
});

test('debería mostrar una cita aleatoria cuando no se ingresa un nombre', async () => {
  render(<Cita />);

  fireEvent.click(screen.getByRole('button', { name: /Obtener cita aleatoria/i }));

  const cita = await screen.findByText(/I believe the children are the future... Unless we stop them now!/i);
  expect(cita).toBeInTheDocument();
});

test('Debe mostrar una cita del personaje especificado 1', async () => {
  render(<Cita />);

  const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
  fireEvent.change(input, { target: { value: 'Homer' } });
  const button = screen.getByText(/Obtener cita/i);
  fireEvent.click(button);

  const cita = await screen.findByText(/Facts are meaningless. You could use facts to prove anything that's even remotely true./i);
  const autor = await screen.findByText(/Homer Simpson/i);
  expect(cita).toBeInTheDocument();
  expect(autor).toBeInTheDocument();
});

test("Debe mostrar una cita del personaje especificado 2", async () => {
  render(<Cita />);

  const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
  fireEvent.change(input, { target: { value: 'Homer' } });
  const button = screen.getByText(/Obtener cita/i);
  fireEvent.click(button);

  const cita = await screen.findByText(/Oh, so they have Internet on computers now!/i);
  expect(cita).toBeInTheDocument();
});

test('debería mostrar un mensaje de error si se ingresa un valor numérico', async () => {
  render(<Cita />);

  fireEvent.change(screen.getByRole('textbox'), { target: { value: '123' } });
  fireEvent.click(screen.getByRole('button', { name: /Obtener cita/i }));

  const errorMessage = await screen.findByText(/Por favor ingrese un nombre válido/i);
  expect(errorMessage).toBeInTheDocument();
});

test("borrar la cita cuando apretas el boton", async () => {
  render(<Cita />);

  fireEvent.change(screen.getByPlaceholderText(/ingresa el nombre del autor/i), { target: { value: 'Homer Simpson' } });
  fireEvent.click(screen.getByRole('button', { name: /obtener cita/i }));

  await waitFor(() => {
    expect(screen.getByText(/d' oh!/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button', { name: /borrar/i }));

  await waitFor(() => {
    expect(screen.queryByText(/d' oh!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Homer Simpson/i)).not.toBeInTheDocument();
  });

  expect(screen.getByPlaceholderText(/ingresa el nombre del autor/i)).toHaveValue('');
});
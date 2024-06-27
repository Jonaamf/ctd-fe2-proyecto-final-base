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

  const button = await screen.findByText(/Obtener cita/i);
  fireEvent.click(button);

  await waitFor(() => {
    expect(
      screen.getByText(
        /You're turning me into a criminal when all I want to be is a petty thug./i
      )
    ).toBeInTheDocument();
  });
});

test("debería mostrar una cita de ese personaje", async () => {
  render(<Cita />);

  fireEvent.change(screen.getByLabelText(/Author Cita/i), { target: { value: 'Homer Simpson' } });
  const boton = await screen.findByText(/Obtener cita/i);
  fireEvent.click(boton);
  
  await waitFor(() => {
    expect(
      screen.getByText(
        /All I'm gonna use this bed for is sleeping, eating and maybe building a little fort./i
      )
    ).toBeInTheDocument();
  });

  expect(screen.getByText(/Homer Simpson/i)).toBeInTheDocument();
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

  fireEvent.change(screen.getByPlaceholderText(/Ingresa el nombre del autor/i), { target: { value: 'Homer Simpson' } });
  fireEvent.click(screen.getByRole('button', { name: /Obtener cita/i }));

  await waitFor(() => {
    expect(screen.getByText(/All I'm gonna use this bed for is sleeping, eating and maybe building a little fort./i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button', { name: /Borrar/i }));

  await waitFor(() => {
    expect(screen.queryByText(/All I'm gonna use this bed for is sleeping, eating and maybe building a little fort./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Homer Simpson/i)).not.toBeInTheDocument();
  });

  expect(screen.getByPlaceholderText(/Ingresa el nombre del autor/i)).toHaveValue('');
});


import { screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../mocks/server';
import { render } from '../../test-utils';
import Cita from '../quote/Cita';


test ("renderizar componentes", () => {
    render(<Cita/>);

    const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
    const button = screen.getByText(/Obetener Cita/i);
    const buttonDelete = screen.getByText(/borrar/i);

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(buttonDelete).toBeInTheDocument();
})


test('debería mostrar una cita aleatoria cuando no se ingresa un nombre', async () => {
    render(<Cita />);
  
    screen.debug();
    fireEvent.click(screen.getByRole('button', { name: /Obtener cita/i }));
  
    await waitFor(() => {
      expect(screen.getByText("I'm sleeping in the bath tub.")).toBeInTheDocument();
    });
  });
  

  test('debería mostrar una cita del personaje especificado 1', async () => {
    render(<Cita />);
  
    const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
    fireEvent.change(input, {target: "homer"});
    const button = screen.getByText(/Obtener Cita/i);
    fireEvent.click(button);
  
    const cita = await screen.findByText(/Facts are meaningless. You could use facts to prove anything that's even remotely true./i);
    expect(cita).toBeInTheDocument();
  });

  test('debería mostrar una cita del personaje especificado 2', async () => {
    render(<Cita />);
  
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Homer' } });
    fireEvent.click(screen.getByRole('button', { name: /Obtener cita/i }));
  
    await waitFor(() => {
      expect(screen.getByText("Facts are meaningless. You could use facts to prove anything that's even remotely true.")).toBeInTheDocument();
    });
  });
  
  test('debería mostrar un mensaje de error si se ingresa un valor numérico', async () => {
    render(<Cita />);
  
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /Obtener cita/i }));
  
    await waitFor(() => {
      expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument();
    });
  });
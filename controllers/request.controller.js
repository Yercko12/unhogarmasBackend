import { requestModel } from "../models/pet.model.js";

// obtener todas las solicitudes
const findRequest = async (req, res) => {
  try {
    const requests = await requestModel.findAllRequest();
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error al obtener las solicitudes:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// crear una nueva solicitud
const createRequest = async (req, res) => {
  try {
    const newRequest = await requestModel.create(req.body);
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error al crear la solicitud:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// actualizar status de una solicitud por ID
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'El campo "status" es requerido en el body' });
    }

    const updatedRequest = await requestModel.update(status, id);

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error al actualizar el status:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Eliminar una solicitud
const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await requestModel.remove(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    res.status(200).json({ message: 'Solicitud eliminada correctamente', deletedRequest });
  } catch (error) {
    console.error('Error al eliminar la solicitud:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const requestController = {
  createRequest, 
  findRequest, 
  deleteRequest, 
  updateStatus
}
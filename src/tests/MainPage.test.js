import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import axios from 'axios';

const axiosGetMock = [{
  id: 1,
  title: "My first activity",
  date: "06/06/2022",
  time: "12:00",
  details: "A very important activity that will change my life",
  status: "in progress",
  creationAt: "06/06/2022",
},
{
  id: 2,
  title: "My second activity",
  date: "07/06/2022",
  time: "13:00",
  details: "An important activity that will change my life too",
  status: "pending",
  createdAt: "06/06/2022",
}];

jest.mock('axios');

describe('Testing Main Page', () => {
  describe('Task Menu', () => {
    test('1 Should have Menu', () => {
      renderWithRouter(<App />);
      const menu = screen.getByTestId('taskMenu');
      expect(menu).toBeInTheDocument();
    });
    test('2 Should have menu option to add a new task', () => {
      renderWithRouter(<App />);
      const addTaskButton = screen.getByRole('button', { name: /add new task/i });
      expect(addTaskButton).toBeInTheDocument();
    });

    test('3 Should have fileds "Date, Time, Title, Details and Progress" to add a new task', async () => {
      renderWithRouter(<App />);
      const addTaskButton = screen.getByRole('button', { name: /add new task/i });
      fireEvent.click(addTaskButton);

      const dateField = screen.getByTestId('date');
      const timeField = screen.getByTestId('time');
      const titleField = screen.getByTestId('title');
      const detailsField = screen.getByTestId('details');
      const progressField = screen.getByTestId('progress');

      expect(dateField).toBeInTheDocument();
      expect(timeField).toBeInTheDocument();
      expect(titleField).toBeInTheDocument();
      expect(detailsField).toBeInTheDocument();
      expect(progressField).toBeInTheDocument();
    });

    test('4 Should fill all fileds and hit create to add a new task', async () => {
      renderWithRouter(<App />);
      const addTaskButton = screen.getByRole('button', { name: /add new task/i });
      fireEvent.click(addTaskButton);

      const dateField = screen.getByTestId('date');
      const timeField = screen.getByTestId('time');
      const titleField = screen.getByTestId('title');
      const detailsField = screen.getByTestId('details');
      const progressField = screen.getByRole('option', { name: /progress/i });
      fireEvent.paste(dateField, "06062022");
      fireEvent.paste(timeField, "1200");
      fireEvent.paste(titleField, "My first activity");
      fireEvent.paste(detailsField, "A very important activity that will change my life");
      fireEvent.select(progressField, "pending");

      const createTaskButton = screen.getByRole('button', { name: /create task/i });
      expect(createTaskButton).toBeInTheDocument();

      fireEvent.click(createTaskButton);
      
      const taskCreatedText = await screen.findByText(/task created/i);
      expect(taskCreatedText).toBeInTheDocument();
    });
  });
  describe("Task Panel", () => {
    beforeAll(() => {
      axios.get.mockResolvedValue(axiosGetMock);
      axios.put.mockResolvedValue(axiosGetMock[1]);
      axios.delete.mockResolvedValue({});
    });

    test("5 Should have Titles, Dates, Timestamps, Creation date, Details and Status", () => {
      renderWithRouter(<App />);

      const tasksTitles = screen.getAllByTestId('tasksTitles');
      const tasksDates = screen.getAllByTestId('tasksDates');
      const tasksTimestamps = screen.getAllByTestId('tasksTimestamps');
      const tasksCreationDates = screen.getAllByTestId('tasksCreationDates');
      const tasksDetails = screen.getAllByTestId('tasksDetails');
      const tasksStatus = screen.getAllByTestId('tasksStatus');
      
      expect(tasksTitles).toBeInTheDocument();
      expect(tasksDates).toBeInTheDocument();
      expect(tasksTimestamps).toBeInTheDocument();
      expect(tasksCreationDates).toBeInTheDocument();
      expect(tasksDetails).toBeInTheDocument();
      expect(tasksStatus).toBeInTheDocument();
      
    });

    test("6 Should have edit task option", async () => {
      renderWithRouter(<App />);

      const editTaskButton = await screen.findByRole('button', {name: /editTask1/});
      expect(editTaskButton).toBeInTheDocument();
      
      fireEvent.click(editTaskButton);
      
      const taskTitle = await screen.findByRole('input', {name: /taskTitle1/});
      const taskDate = await screen.findByRole('input', {name: /taskDate1/});
      const taskTimestamp = await screen.findByRole('input', {name: /taskTimestamp1/});
      const taskCreationDate = await screen.findByRole('input', {name: /taskCreationDate1/});
      const taskDetail = await screen.findByRole('input', {name: /taskDetail1/});
      const taskStatus = await screen.findByRole('option', {name: /taskStatus1/});
      
      expect(taskTitle).toBeInTheDocument();
      expect(taskDate).toBeInTheDocument();
      expect(taskTimestamp).toBeInTheDocument();
      expect(taskCreationDate).toBeInTheDocument();
      expect(taskDetail).toBeInTheDocument();
      expect(taskStatus).toBeInTheDocument();

      const updateTaskButton = await screen.findByTestId('updateTask1');
      expect(updateTaskButton).toBeInTheDocument();
      fireEvent.click(updateTaskButton);
      expect(axios.put).toHaveBeenCalledTimes(1);

    });

    test("7 Should have delete task option", async () => {
      renderWithRouter(<App />);

      const deleteTaskButton = await screen.findByTestId('deleteTask1');
      expect(deleteTaskButton).toBeInTheDocument();

      fireEvent.click(deleteTaskButton);

      const taskTitle = await screen.findByTestId("taskTitle1");
      const taskDate = await screen.findByTestId("taskDate1");
      const taskTimestamp = await screen.findByTestId("taskTimestamp1");
      const taskCreationDate = await screen.findByTestId("taskCreationDate1");
      const taskDetail = await screen.findByTestId("taskDetail1");
      const taskStatus = await screen.findByTestId("taskStatus1");
      
      expect(taskTitle).not.toBeInTheDocument();
      expect(taskDate).not.toBeInTheDocument();
      expect(taskTimestamp).not.toBeInTheDocument();
      expect(taskCreationDate).not.toBeInTheDocument();
      expect(taskDetail).not.toBeInTheDocument();
      expect(taskStatus).not.toBeInTheDocument();
      expect(axios.delete).toHaveBeenCalledTimes(1);

    });
  });
})
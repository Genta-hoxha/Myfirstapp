import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
  en: {
    translation: {
      // title: "MY TASKS",
      completedTasks: "Completed Tasks",
      completed: "Completed",
      uncompleted: "Uncompleted",
      unbutton: "Mark as Completed",
      delete: "Delete",
      noCompletedTasks: "No completed tasks found.",
      uncompletedTasks: "Uncompleted Tasks",
      noUncompletedTasks: "No uncompleted tasks found.",
      tags: "Tags",
      createdon: "Created on",
      save: "Save",
      title: "{{title}}",
    
      description: "{{description}}",
      taskForm: {
        titlePlaceholder: "Task Title",
        descriptionPlaceholder: "Task Description",
        tagsPlaceholder: "Tags (comma separated)",
        addButton: "Add Task",
        addingButton: "Adding...",
        errorAddingTask: "Error adding task. Please try again.",
       
      },
      
    },
  },
  it: {
    translation: {
      // title: "I MIEI COMPITI",
      completedTasks: "Compiti Completati",
      completed: "Completate",
      uncompleted: "Non Completate",
      unbutton: "Segna come completato",
      delete: "Eliminare",
   
      noCompletedTasks: "Non ci sono compiti completati.",
      uncompletedTasks: "Compiti Non Completati",
      noUncompletedTasks: "Non ci sono compiti non completati.",
      tags: "Tag",
      createdon: "Creato il",
      save: "Salva",
      title: "Titolo: {{title}}",
     description: "Descrizione del Compito: {{description}}",
      taskForm: {
        titlePlaceholder: "Titolo del Compito",
        descriptionPlaceholder: "Descrizione del Compito",
        tagsPlaceholder: "Tag (separati da virgola)",
        addButton: "Aggiungi Compito",
        addingButton: "Aggiungendo...",
        errorAddingTask: "Errore durante l'aggiunta del compito. Riprova.",
       
      },
    },
  },
  sq: {
    translation: {
      // title: "DETYRAT E MIA",
      completedTasks: "Detyrat e përfunduara",
      completed: "E përfunduar",
      uncompleted: "E papërfunduar",
      unbutton: "Shënoni si të përfunduar",
      delete: "Fshij",
      noCompletedTasks: "Nuk ka detyra të përfunduara.",
      uncompletedTasks: "Detyrat e Papërfunduara",
      noUncompletedTasks: "Nuk u gjetën detyra të pashëmbull.",
      tags: "Etiketat",
      createdon: "Krijuar më",
      save: "Ruaj",
      title: "Titulli i detyrës: {{title}}",
      description: "Përshkrimi i detyrës: {{description}}",
      taskForm: {
        titlePlaceholder: "Titulli i Detyrës",
        descriptionPlaceholder: "Përshkrimi i Detyrës",
        tagsPlaceholder: "Etiketa (të ndara me presje)",
        addButton: "Shto Detyrë",
        addingButton: "Duke Shtuar...",
        errorAddingTask: "Gabim gjatë shtimit të detyrës. Provoni përsëri.",
        
      },
    },
  },
};


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;

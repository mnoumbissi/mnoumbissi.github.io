// bd
const LISTE_ETUDIANTS = [];

// Obj
function Matiere(libelle = '', note = 0) {
    this.nom = libelle;
    this.note = note;
}

function Etudiant(nom = '', prenom = '', sexe = '', dateNais = '', lieuNais, parcours = '', poids = 0, taille = 0.0, matieres = []) {
    this.nom = nom;
    this.prenom = prenom;
    this.dateNais = dateNais;
    this.lieuNais = lieuNais;
    this.parcours = parcours;
    this.matieres = matieres;
    this.sexe = sexe;
    this.poids = poids;
    this.taille = taille;
}

//  bouton ajout des matieres
var tempMatieres = [];
let ajoutMatiere = document.getElementById('ajoutM');
ajoutMatiere.addEventListener('click', () => {
    let matiere = document.getElementById('matier').value;
    let note = document.getElementById('note').value;

    let mat = new Matiere(matiere, note);
    tempMatieres.push(mat);

    let tr = document.createElement('tr');
    let tdM = document.createElement('td');
    tdM.innerHTML = matiere;
    let tdN = document.createElement('td');
    tdN.innerHTML = note;

    tr.appendChild(tdM);
    tr.appendChild(tdN);

    document.getElementById('Tnote').appendChild(tr);


    document.getElementById('matier').value = '';
    document.getElementById('note').value = '';
});

// bouton enregistrer
let ButtonEnreg = document.getElementById('enreg');
ButtonEnreg.addEventListener('click', () => onSaveButtonClick(tempMatieres));

function onSaveButtonClick(matiere) {
    let nom = document.getElementById('nom').value;
    let prenom = document.getElementById('prenom').value;
    let dateNais = document.getElementById('dtenais').value;
    let lieuNais = document.getElementById('lnais').value;
    let parcours = document.getElementById('parcours').value;
    let sexe = document.getElementById('sexe').value;
    let poids = document.getElementById('poids').value;
    let taille = document.getElementById('taille').value;

    let student = new Etudiant(nom, prenom, sexe, dateNais, lieuNais, parcours, poids, taille, matiere);
    enregEtudiant(student);
    AjoutEtudiant(student);

    alert('Etudiant sauvegarde !');
    clearFormData();
}

function enregEtudiant(student = new Etudiant()) {
    LISTE_ETUDIANTS.push(student);
}

function AjoutEtudiant(currentStudent = new Etudiant()) {

    let myTable = document.getElementById('info_tab');

    let tr = document.createElement('tr');
    tr.setAttribute('pour', 'vrai');

    let tdNo = document.createElement('td');
    tdNo.innerHTML = LISTE_ETUDIANTS.length;
    let tdNom = document.createElement('td');
    tdNom.innerHTML = currentStudent.nom + ' ' + currentStudent.prenom;
    let tdDate = document.createElement('td');
    tdDate.innerHTML = currentStudent.dateNais;
    let tdLieu = document.createElement('td');
    tdLieu.innerHTML = currentStudent.lieuNais;
    let tdSexe = document.createElement('td');
    tdSexe.innerHTML = currentStudent.sexe;
    let tdParcours = document.createElement('td');
    tdParcours.innerHTML = currentStudent.parcours;
    let tdAction = document.createElement('td');

    let btnEdit = document.createElement('a');
    btnEdit.setAttribute('class', 'btn btn-warning');
    btnEdit.innerHTML = '+ ';

    let btnDele = document.createElement('a');
    btnDele.setAttribute('class', 'btn btn-danger text-dark mx-2');
    btnDele.innerHTML = '-';
    btnDele.addEventListener('click', () => {
        console.log('Avant', LISTE_ETUDIANTS);

        studentId = parseInt(tdNo.innerHTML) - 1;
        LISTE_ETUDIANTS.splice(studentId, 1);
        myTable.removeChild(tr);

        document.getElementById('lnom').innerHTML = '';
        document.getElementById('lprenom').innerHTML = '';
        document.getElementById('ldate').innerHTML = '';
        document.getElementById('lparcours').innerHTML = '';
        document.getElementById('tab_mynote').innerHTML = '';

        console.log('Apres', LISTE_ETUDIANTS);
    });

    tdAction.appendChild(btnEdit);
    tdAction.appendChild(btnDele);

    tr.appendChild(tdNo);
    tr.appendChild(tdNom);
    tr.appendChild(tdDate);
    tr.appendChild(tdLieu);
    tr.appendChild(tdSexe);
    tr.appendChild(tdParcours);
    tr.appendChild(tdAction);

    tr.addEventListener(
        'click',
        () => showStudentDetailledInfos(parseInt(tdNo.innerHTML) - 1)
    );

    myTable.appendChild(tr);
}

function showStudentDetailledInfos(studentId) {
    let id = studentId;
    let student = LISTE_ETUDIANTS[id];

    // Persone
    document.getElementById('lnom').innerHTML = '<b>Nom & prenom : </b>' + student.nom + ' ' + student.prenom;
    document.getElementById('lprenom').innerHTML = '<b>Date et lieu de naissance : </b><br />' + student.dateNais + ' <b>a</b> ' + student.lieuNais;
    document.getElementById('ldate').innerHTML = '<b>Sexe</b> : ' + student.sexe;
    document.getElementById('lparcours').innerHTML = '<b>Parcours</b> : ' + student.parcours;
    document.getElementById('lpersonne').innerHTML = '<b>Poids</b> : ' + student.poids + ' kg <b>Taille</b> : ' + student.taille / 100 + ' m';

    // Notes
    document.getElementById('tab_mynote').innerHTML = '';
    let notes = student.matieres;
    if (notes.length > 0) {

        notes.forEach((note) => {
            let tab_note = document.getElementById('tab_mynote');
            let tr = document.createElement('tr');
            let tdMat = document.createElement('td');
            tdMat.innerHTML = note.nom;
            let tdNot = document.createElement('td');
            tdNot.innerHTML = note.note;

            tr.appendChild(tdMat);
            tr.appendChild(tdNot);
            tab_note.appendChild(tr);
        });
    }
}

function clearFormData() {
    tempMatieres = [];
    document.getElementById('nom').value = '';
    document.getElementById('prenom').value = '';
    document.getElementById('dtenais').value = '';
    document.getElementById('lnais').value = '';
    document.getElementById('parcours').value = '';

    document.getElementById('matiere').value = '';
    document.getElementById('note').value = '';
    document.getElementById('tab_note').innerHTML = '';
}
// --- 1. VARIABLES GLOBALES Y DATOS ---

// Este es el array de cursos (Lo que pedían las instrucciones).
// IMPORTANTE: Cambia 'completed: true' o 'false' según tu progreso real.
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually designing and building web pages using HTML and CSS. The course relies on Linux and focuses on "hand" coding.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and use functions written by others; to write, test, debug, and document their own functions; and to write programs that use functions.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create interactive experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// --- 2. FUNCIONALIDAD DEL MENÚ HAMBURGUESA ---

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// --- 3. FUNCIONALIDAD DEL FOOTER (FECHAS) ---

// Año actual
document.getElementById("currentyear").innerHTML = new Date().getFullYear();

// Última modificación
document.getElementById("lastModified").innerHTML = "Last Modification: " + document.lastModified;


// --- 4. FUNCIONALIDAD DE LOS CURSOS (MOSTRAR Y FILTRAR) ---

const courseContainer = document.querySelector('.course-grid');
const totalCreditsSpan = document.querySelector('#total-credits');

// Función para mostrar los cursos en el HTML
function displayCourses(courseList) {
    // Limpiamos el contenedor por si había algo antes
    courseContainer.innerHTML = '';

    courseList.forEach(course => {
        // Creamos la tarjeta (div)
        const card = document.createElement('div');
        card.classList.add('course-card');

        // Si el curso está completado, añadimos una clase especial para CSS
        if (course.completed) {
            card.classList.add('completed');
        }

        // Insertamos el contenido HTML dentro de la tarjeta
        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Tech:</strong> ${course.technology.join(', ')}</p>
        `;

        // Agregamos la tarjeta al contenedor principal
        courseContainer.appendChild(card);
    });
    
    // Calculamos el total de créditos de los cursos mostrados usando .reduce()
    const totalCredits = courseList.reduce((total, course) => total + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

// --- 5. EVENT LISTENERS PARA LOS BOTONES DE FILTRO ---

document.querySelector('#all').addEventListener('click', () => {
    displayCourses(courses);
});

document.querySelector('#cse').addEventListener('click', () => {
    // Usamos .filter() para obtener solo los de CSE
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});

document.querySelector('#wdd').addEventListener('click', () => {
    // Usamos .filter() para obtener solo los de WDD
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});

// --- 6. INICIALIZACIÓN ---
// Mostramos todos los cursos al cargar la página por primera vez
displayCourses(courses);
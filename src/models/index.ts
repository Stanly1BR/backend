import sequelize from '../db.js';

// 1. Importando todos os models
import Auth from './auth.js';
import Medico from './medico.js';
import Paciente from './paciente.js';
import Consulta from './consulta.js';
import Diagnostico from './diagnostico.js';

/**
 * =====================================================
 * DEFININDO AS ASSOCIAÇÕES (Relacionamentos)
 * =====================================================
 */

/**
 * Auth <-> Médico / Paciente
 * Um usuário Auth pode ser um Médico ou um Paciente
 */
Auth.hasOne(Medico, {
    foreignKey: 'authId',
    as: 'medico',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Medico.belongsTo(Auth, {
    foreignKey: 'authId',
    as: 'auth',
});

Auth.hasOne(Paciente, {
    foreignKey: 'authId',
    as: 'paciente',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Paciente.belongsTo(Auth, {
    foreignKey: 'authId',
    as: 'auth',
});

/**
 * Médico / Paciente <-> Consulta
 * Um Médico tem muitas Consultas
 * Um Paciente tem muitas Consultas
 */
Medico.hasMany(Consulta, {
    foreignKey: 'medicoId',
    as: 'consultasAtendidas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Consulta.belongsTo(Medico, {
    foreignKey: 'medicoId',
    as: 'medico',
});

Paciente.hasMany(Consulta, {
    foreignKey: 'pacienteId',
    as: 'consultas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Consulta.belongsTo(Paciente, {
    foreignKey: 'pacienteId',
    as: 'paciente',
});

/**
 * Consulta / Paciente <-> Diagnóstico
 * Uma Consulta tem muitos Diagnósticos
 * Um Paciente tem muitos Diagnósticos
 */
Consulta.hasMany(Diagnostico, {
    foreignKey: 'consultaId',
    as: 'diagnosticos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Diagnostico.belongsTo(Consulta, {
    foreignKey: 'consultaId',
    as: 'consulta',
});

Paciente.hasMany(Diagnostico, {
    foreignKey: 'pacienteId',
    as: 'diagnosticos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Diagnostico.belongsTo(Paciente, {
    foreignKey: 'pacienteId',
    as: 'paciente',
});

/**
 * =====================================================
 * EXPORTANDO sequelize e os models
 * =====================================================
 */
export {
    sequelize,
    Auth,
    Medico,
    Paciente,
    Consulta,
    Diagnostico
};

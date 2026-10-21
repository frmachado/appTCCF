-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.46 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando dados para a tabela bancotcc.cadastro: ~2 rows (aproximadamente)
INSERT INTO `cadastro` (`idCadastro`, `idUsuario`, `nome`, `email`, `cpf`, `telefone`, `dataNascimento`, `endereco`, `categoriaCarta`) VALUES
	(1, 4, 'juju', 'ju@gmail.com', '52738021808', '13997000100', '2007-07-31', 'rua bla bla bla', 'visual'),
	(2, 3, 'lindomar', 'fafa@gmail.com', '99999999999', '99999999999', '2001-01-31', 'rua joaquim kkkk', 'idoso');

-- Copiando dados para a tabela bancotcc.duvidas: ~0 rows (aproximadamente)
INSERT INTO `duvidas` (`idDuvida`, `idUsuario`, `nomeUsuario`, `emailUsuario`, `duvida`, `dataEnvio`) VALUES
	(1, 4, 'juju', 'ju@gmail.com', 'enviar', '2026-09-14 03:25:17');

-- Copiando dados para a tabela bancotcc.mensagens_chat: ~3 rows (aproximadamente)
INSERT INTO `mensagens_chat` (`id`, `usuario_id`, `nome_usuario`, `mensagem`, `data_envio`) VALUES
	(1, 3, 'lindomar', 'oi', '2026-09-16 02:58:46'),
	(2, 4, 'juju', 'oi', '2026-09-16 22:38:12'),
	(3, 3, 'lindomar', 'oie', '2026-09-17 00:13:23'),
	(4, 4, 'juju', 'ooooooooooo', '2026-09-17 00:13:41');

-- Copiando dados para a tabela bancotcc.usuarios: ~11 rows (aproximadamente)
INSERT INTO `usuarios` (`idUsuario`, `nome`, `email`, `senha`, `tipoUsuario`, `criadoEm`) VALUES
	(1, 'julio', 'julio@gmail.com', '$2y$10$Xyb6Vv2WGLhSs8FujQ5JyO0MhV6DOS6wWp9khewnbRXMOGkQ4YSOW', 'usuario', '2026-09-12 03:10:33'),
	(2, 'fafa', 'fabricioriba@outlook.com', '$2y$10$K/x70eiIUFdlyRY8qnLfrueTe.HUYjkcW/7kqKIRDRG.CP5nMz6iW', 'usuario', '2026-09-12 06:58:02'),
	(3, 'lindomar', 'fafa@gmail.com', '$2y$10$/SuSf3QXrtnNgyeFs4zuP.EZhg6l0Bg9tkU3BTrxT9dzBfgabA6kq', 'usuario', '2026-09-12 07:01:42'),
	(4, 'juju', 'ju@gmail.com', '$2y$10$F0aAf1gntuMdT7GABeVsreHKMbmxXaLf42MEWzFZAMkSiGDZr2B3m', 'usuario', '2026-09-12 07:19:55'),
	(5, 'hipi', 'hipi@gmail.com', '$2y$10$W8o6AC6sYz5.7nT5RghHkeChfBO2Z.8drbqI853sAF8o1atpYbHN.', 'usuario', '2026-09-12 08:06:52'),
	(6, 'vinicius', 'vi@gmail.com', '$2y$10$JEOf5rOsA2FLjsXi1xOPiuzqlHlia6fd/Qp.kKu0yudnUFo4ZN8G2', 'usuario', '2026-09-12 08:07:23'),
	(7, 'gusta', 'gustavokenjikato@gmail.com', '$2y$10$/Tt388H9wFaMo8.InmNIJOivkfCXeuWQPS/TiMPmuBIU0y6ovvDoa', 'usuario', '2026-09-12 08:14:51'),
	(8, 'arthur', 'arthur@gmail.com', '$2y$10$Q8upjI6atULU3cz857l3uuNt/6.iCnSiDMjHnWhSeuEwKg8PTuLae', 'usuario', '2026-09-12 08:21:10'),
	(9, 'Gabrielly Assis Ferro', 'gabriellyassisferro17@gmail.com', '$2y$10$STL1RjyKOVi3b.ZpyhqkUOryRUjPjEnK18bsCQxYEMis1Y7qpzpM2', 'usuario', '2026-09-12 08:29:50'),
	(10, 'fabricio', 'fafa00@gmail.com', '$2y$10$SrWA4m6IyHf3gqCBjfzYUeAx190EpOY.SjzhOxmgvpRP6vSelRKZa', 'usuario', '2026-09-12 23:05:39'),
	(11, 'jucilene machado', 'ju2@gmail.com', '$2y$10$pDSyeywnlJCwuFT9cA7rC.njmPm1WSAdoiR7j02IrmVKMY4Lm2WOy', 'usuario', '2026-09-12 23:50:48');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

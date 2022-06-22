

-- --------------------------------------------------------

--
-- Estrutura da tabela `perfil_usuario`
--

CREATE TABLE `perfil_usuario` (
  `CODIGO` int(10) UNSIGNED NOT NULL,
  `GUID` varchar(36) DEFAULT NULL,
  `DESCRICAO` varchar(36) DEFAULT NULL,
  `PERFIL` char(1) DEFAULT NULL,
  `SITUACAO` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `perfil_usuario`
--

INSERT INTO `perfil_usuario` (`CODIGO`, `GUID`, `DESCRICAO`, `PERFIL`, `SITUACAO`) VALUES
(1, '22a9cae3-a0c6-40d5-89ee-774d46279dc6', 'Admin', 'T', 'A'),
(2, '22a9cae3-a0c6-40d5-89ee-774d46279dc6', 'User', 'T', 'A');

-- --------------------------------------------------------

-

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `CODIGO` int(10) UNSIGNED NOT NULL,
  `COD_PERFIL_USUARIO` int(10) UNSIGNED NOT NULL,
  `GUID` varchar(36) DEFAULT NULL,
  `NOME` varchar(50) DEFAULT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
  `SENHA` varchar(60) DEFAULT NULL,
  `passwordResetToken` varchar(500) DEFAULT NULL,
  `passwordResetExpires` datetime DEFAULT NULL,
  `registrationDate` datetime DEFAULT NULL,
  `activeJWT` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`CODIGO`, `COD_PERFIL_USUARIO`, `GUID`, `NOME`, `EMAIL`, `SENHA`, `passwordResetToken`, `passwordResetExpires`, `registrationDate`, `activeJWT`) VALUES
(1, 1, '22a9cae3-a0c6-40d5-89ee-774d46279dc6', 'Fabricio', 'fabricio.inttegre@gmail.com', '$2b$10$uBQmQFYOAZF6cNU3NDIs.euojCzmO0A9IZUpXdI2590dKelmUduSa', '23c4dd50a073f802dd74aaa146cf10446bfe9cf2', '2021-08-10 10:57:51', '2020-12-30 14:35:28', NULL),
(2, 1, 'a76b888e-e380-4f27-918e-b3688a0aa9a1', 'Elias', 'elias.diagnosys@gmail.com', '$2b$10$rcujqnlu7IsfwLZr.PEX5u/JKTtT4d7B9Q7g.V21Lfff4EISYkqFW', '', NULL, NULL, NULL),
(3, 1, 'c3fb9fbb-c6c3-4ec2-842d-61fea583af78', 'novousuario', 'novousuario@teste.com.br', '$2b$10$Nsrh5l86AgFEQyw/FlG1ke4bq8uSdyuP5q5Ca.qcbvbTNoiuGv9H6', '', NULL, NULL, NULL),
(5, 1, 'b286404d-26c7-454e-9095-a0b3c558bd81', 'Marcos', 'marcos@inttegre.com.br', '$2b$10$iqZF5QD8vw1hzMmH0jlvNedmKbHV2.7ATS5c55h7rj0Dg.2Z8SGtG', '', NULL, NULL, NULL),
(6, 1, '53d824f0-b227-458e-a4c3-28033615ff20', 'teste', 'teste@test.com.br', '$2b$10$Ni1RFEBOGRfFQAgoxdPNOuK7DKO/0Mqc4sQPOHQk9PGoykPf2hiJS', '', NULL, NULL, NULL),
(7, 1, 'f2368032-cd75-4388-a1b2-d4db4be32fee', 'Testes', 'marcospberger@gmail.com', '$2b$10$Bv.R5LhcPsWJGuiV0AfF..loGnb19S6xl.k6Oyg/kBwckRkc8zJMu', '', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDT0RJR08iOjcsIkdVSUQiOiJmMjM2ODAzMi1jZDc1LTQzODgtYTFiMi1kNGRiNGJlMzJmZWUiLCJOT01FIjoiVGVzdGVzIiwiQ09EX1BFUkZJTF9VU1VBUklPIjoxLCJpYXQiOjE2MzgyODMzNzgsImV4cCI6MTYzODI4Njk3OH0.vp_VMz2N5Cx91PDlmPBgFadEDqyk9t7SJAfptjGFbJw'),
(8, 1, 'd48ffcb7-3620-458f-947b-067347f4f816', 'Fabricio', 'fabriciosilva187@gmail.com', '$2b$10$nnZLoofH8OC5UzfjWmY24uPD/Qaiw2Fs4QF8KKpL/Zc..xSqZhJZ2', 'a90a0653548218f775259ef75fd653cd72eeca67', '2021-06-07 21:05:46', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDT0RJR08iOjgsIkdVSUQiOiJkNDhmZmNiNy0zNjIwLTQ1OGYtOTQ3Yi0wNjczNDdmNGY4MTYiLCJOT01FIjoiRmFicmljaW8iLCJDT0RfUEVSRklMX1VTVUFSSU8iOjEsImlhdCI6MTY0MjQzMDMyMSwiZXhwIjoxNjQyNDMzOTIxfQ.xflxBGxl7s0aUmJxXSaK-NQ8-er1mxTqAjljI2Htb5k'),
(9, 1, '543a3a55-a32e-45e9-8d85-2cc56c0ad934', 'claudio', 'holandacgs@gmail.com', '$2b$10$uNHt7wP7p6cNkw8ypoleXuu1wb.5t75qNdL63WFPWx7MbZZBqu7kq', '', NULL, NULL, NULL),
(10, 1, 'ffe19991-c8c4-4388-88a0-286faf0a61c1', 'Marlon Kaufmann', 'lugardeconfeitar@gmail.com', '$2b$10$Wdx0krICHFgzQx0QRw6W4e7dQGdD.Gr6oeB5sOsRkBgCnxw1lw0fa', '', NULL, NULL, NULL),
(11, 1, 'df0fd321-e75f-410d-8013-28d84915cf48', 'Otton', 'Otton@uniteck.com.br', '$2b$10$t8nsMu3HXjcWEm4g4KxNjOj1LL9K.AcXOxgKmv9B4kzuVikv77gA.', '', NULL, NULL, NULL),
(12, 1, 'fee08929-3bab-48f3-8efa-b6c32c4c1b0e', 'Victor', 'victor.inttegre@gmail.com', '$2b$10$RyQD/SLTkOF4001aMmae0uQOTwiZF7DyNjWa/gcbdZhgtXyITuF9y', 'cb4ff25a7ec6245ad29fc92c453e2aef1a5d2f70', '2021-04-23 18:32:51', NULL, NULL),
(13, 2, '22a9cae3-a0c6-40d5-89ee-774d46279dc6', 'user_padrao', 'userpadrao@inttegre.com.br', '$2b$10$zXEiTY/vrBa9yZnItlBEy.C.bkUhfdY3MbiQUp8MIRzOU94AK1uF2', NULL, NULL, '2021-05-12 12:37:38', NULL),
(14, 1, 'f2368032-cd75-4388-a1b2-d4db4be32fee', 'INTTEGRE', 'suporte@inttegre.com.br', '$2b$10$MS./lBpZqAl9R4wbuChFjej37Z0KLTJ2O7E8jmrUeByhOSuPWQDPy', NULL, NULL, '2021-05-17 10:36:30', NULL),
(15, 1, 'f2368032-cd75-4388-a1b2-d4db4be32fee', 'Teste05', 'marcosp@gmail.com', '$2b$10$qqlG0RpRZ8YJ66Nq46BEye6b1d431Z020CRzVWTbT7u0SB9XIV99y', NULL, NULL, '2021-05-17 11:42:11', NULL),
(16, 1, 'eaeca94d-5cc1-442b-9250-7cb516925d20', 'Paola', 'financeiro.inttegre@gmail.com', '$2b$10$4a1/5ChO44YDpvOmnJ.ASeDg/cSk2sshEwrcxrq7rPPsDLTfXWoVO', NULL, NULL, '2021-05-17 15:50:15', NULL),
(17, 2, 'd48ffcb7-3620-458f-947b-067347f4f816', 'INTTEGRE', 'suporte@inttegre.com.br', '$2b$10$UDtjCrLXwVKlktuxuhLJq.hN9jh9Bph8K5I4eSVCBkIM91gexKip6', NULL, NULL, '2021-05-17 16:09:26', NULL),
(18, 1, 'f2368032-cd75-4388-a1b2-d4db4be32fee', 'BBBB', 'E@GMAIL.COM', '$2b$10$sR8Ba9tdsFgNdcuuPler1eedIr0Y8.yM5WULkO6DWp/633sxkDMhy', NULL, NULL, '2021-06-04 16:46:54', NULL),
(19, 1, 'f2368032-cd75-4388-a1b2-d4db4be32fee', 'ssss', 'sss@sss.com.br', '$2b$10$i5THV.ioVkAtu.tPy8uUCuOWnxr2fApYTdDD141B05D3JomxxpyJ.', NULL, NULL, '2021-06-09 09:41:33', NULL),
(20, 1, '5521a7f1-80c7-438a-99ba-82ffd8f63d87', 'teste', 'teste@inttegre.com.br', '$2b$10$PjOx1hFmDYYqBP7sXISpJeG05WMY5Re.ZwPyB4ryecU32g.crfbNe', NULL, NULL, '2021-06-09 10:06:30', NULL),
(21, 1, '239b4dbd-43f5-4172-bfb6-f8e5118f0821', 'usuarioteste2', 'teste2@inttegre.com.br', '$2b$10$FWfL79SuDMVKebmIPbuWIOkAtTkp0xkhmGU3Kb5a17tiV8t4OWqjW', NULL, NULL, '2021-06-09 10:15:01', NULL),
(22, 1, '6f283e21-8e58-47c2-96ba-5acc3d67f8ac', 'User test', 'usertest@inttegre.com.br', '$2b$10$9TBqW7oRNe1igdLoteD98eh1PJkbevLuL9vx6ToYlIYHsnaRcQtOC', NULL, NULL, '2021-06-10 14:22:23', NULL),
(23, 1, '73c46409-6089-4265-a9d6-9e1131949f11', 'Paulo Roberto Peters Henrichs', 'paulo@primeiravisao.com.br', '$2b$10$z2N7maZ6EAKcVrG1Mxtapu0oHnY1oRL59TFmpe0RDwCFGC6aZmgLm', NULL, NULL, '2021-06-10 20:50:55', NULL),
(24, 1, '3fbcd4b3-8927-4901-a68c-f611003acd80', 'Otton Junior', 'otton.junior@live.com', '$2b$10$66jCIKySEKtnzUU0532nn.Y3oKu0p5eUnLk4MA.zlRE5fjN7F8GvC', NULL, NULL, '2021-06-11 10:32:36', NULL),
(25, 1, 'a3fb4113-d9f0-4d85-b4f3-cd9b6d8f8264', 'Elias', 'elias.inttegre@gmail.com', '$2b$10$V71sE3pXnIu51wi4OuX3D.oKzRlVroSeLm3TZJQv7ItjjEUVWIOBS', NULL, NULL, '2021-07-15 17:19:01', NULL),
(26, 1, '44e58fc0-0ba2-49b3-bebb-8e58728b315d', 'nylo', 'nylo.akamas@gmail.com', '$2b$10$VSrwbFfX2dzzONcxZY0iIuZZrSPNwr760wE5CD9SgpNmIAFcKYQfG', NULL, NULL, '2021-08-19 11:14:12', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDT0RJR08iOjI2LCJHVUlEIjoiNDRlNThmYzAtMGJhMi00OWIzLWJlYmItOGU1ODcyOGIzMTVkIiwiTk9NRSI6Im55bG8iLCJDT0RfUEVSRklMX1VTVUFSSU8iOjEsImlhdCI6MTYyOTM4MjQ2MywiZXhwIjoxNjI5Mzg2MDYzfQ.jffKsspj784rZEjyv6jfJQ1GmtE02OwB-YiuEFr5Sp8'),
(27, 1, '83a9257d-720c-400b-b4ee-eb0f59059488', 'Fabio Sotero da Silva', 'fsoterodasilva@gmail.com', '$2b$10$VXxHU4HXtY0LS8PNGJZnXeELZ15AFrJjBSfmHtEq3Zm3VjmJcX8Ci', NULL, NULL, '2021-08-20 10:18:38', NULL),
(28, 1, '172cb2b9-93a3-4808-8fd9-cb9db4f1f0d4', 'Fabio Sotero da Silva', 'fbiosoterodasilva@gmail.com', '$2b$10$2F8Qi.9R8oO.Nv1BoMF0heJIZrwANgyzvpieHBB55NisE8zUlymeu', NULL, NULL, '2021-08-20 10:20:59', NULL),
(29, 1, '507efcbe-744a-424d-9ecd-ae4807cc16f9', 'Irapuã Araujo', 'irapua.araujo@gmail.com', '$2b$10$xcObnEOoccvlV21yrhyou.9T6gZtuOmdK7jNtMzQKyc.ysxz4gE.G', NULL, NULL, '2021-08-20 12:22:30', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDT0RJR08iOjI5LCJHVUlEIjoiNTA3ZWZjYmUtNzQ0YS00MjRkLTllY2QtYWU0ODA3Y2MxNmY5IiwiTk9NRSI6IklyYXB1w6MgQXJhdWpvIiwiQ09EX1BFUkZJTF9VU1VBUklPIjoxLCJpYXQiOjE2Mjk0NzI5NjEsImV4cCI6MTYyOTQ3NjU2MX0.ndne-jdGbF2Ld8GNjoC1Vixs9uDAItGsH3ALiqXWZGQ');

-- --------------------------------------------------------

--
--
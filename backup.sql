--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: frod
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO frod;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: frod
--

COMMENT ON SCHEMA public IS '';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: user_role_enum; Type: TYPE; Schema: public; Owner: frod
--

CREATE TYPE public.user_role_enum AS ENUM (
    'user',
    'admin'
);


ALTER TYPE public.user_role_enum OWNER TO frod;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clinics; Type: TABLE; Schema: public; Owner: frod
--

CREATE TABLE public.clinics (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.clinics OWNER TO frod;

--
-- Name: clinics_doctors_doctors; Type: TABLE; Schema: public; Owner: frod
--

CREATE TABLE public.clinics_doctors_doctors (
    "clinicsId" integer NOT NULL,
    "doctorsId" integer NOT NULL
);


ALTER TABLE public.clinics_doctors_doctors OWNER TO frod;

--
-- Name: clinics_id_seq; Type: SEQUENCE; Schema: public; Owner: frod
--

CREATE SEQUENCE public.clinics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clinics_id_seq OWNER TO frod;

--
-- Name: clinics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: frod
--

ALTER SEQUENCE public.clinics_id_seq OWNED BY public.clinics.id;


--
-- Name: doctor_clinics; Type: TABLE; Schema: public; Owner: frod
--

CREATE TABLE public.doctor_clinics (
    doctor_id integer NOT NULL,
    clinic_id integer NOT NULL
);


ALTER TABLE public.doctor_clinics OWNER TO frod;

--
-- Name: doctor_services; Type: TABLE; Schema: public; Owner: frod
--

CREATE TABLE public.doctor_services (
    doctor_id integer NOT NULL,
    service_id integer NOT NULL
);


ALTER TABLE public.doctor_services OWNER TO frod;

--
-- Name: doctors; Type: TABLE; Schema: public; Owner: frod
--

CREATE TABLE public.doctors (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text
);


ALTER TABLE public.doctors OWNER TO frod;

--
-- Name: doctors_id_seq; Type: SEQUENCE; Schema: public; Owner: frod
--

CREATE SEQUENCE public.doctors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.doctors_id_seq OWNER TO frod;

--
-- Name: doctors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: frod
--

ALTER SEQUENCE public.doctors_id_seq OWNED BY public.doctors.id;


--
-- Name: doctors_services_services; Type: TABLE; Schema: public; Owner: frod
--

CREATE TABLE public.doctors_services_services (
    "doctorsId" integer NOT NULL,
    "servicesId" integer NOT NULL
);


ALTER TABLE public.doctors_services_services OWNER TO frod;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: frod
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO frod;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: frod
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO frod;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: frod
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: frod
--

CREATE TABLE public.password_reset_tokens (
    id integer NOT NULL,
    token character varying NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.password_reset_tokens OWNER TO frod;

--
-- Name: password_reset_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: frod
--

CREATE SEQUENCE public.password_reset_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.password_reset_tokens_id_seq OWNER TO frod;

--
-- Name: password_reset_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: frod
--

ALTER SEQUENCE public.password_reset_tokens_id_seq OWNED BY public.password_reset_tokens.id;


--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: frod
--

CREATE TABLE public.refresh_tokens (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    updated timestamp without time zone DEFAULT now() NOT NULL,
    refresh text NOT NULL,
    device text NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.refresh_tokens OWNER TO frod;

--
-- Name: services; Type: TABLE; Schema: public; Owner: frod
--

CREATE TABLE public.services (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying
);


ALTER TABLE public.services OWNER TO frod;

--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: frod
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.services_id_seq OWNER TO frod;

--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: frod
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: frod
--

CREATE TABLE public.tags (
    created timestamp without time zone DEFAULT now() NOT NULL,
    updated timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.tags OWNER TO frod;

--
-- Name: user; Type: TABLE; Schema: public; Owner: frod
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    updated timestamp without time zone DEFAULT now() NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    phone text,
    role public.user_role_enum DEFAULT 'user'::public.user_role_enum NOT NULL,
    verify boolean DEFAULT false NOT NULL,
    ban boolean DEFAULT false NOT NULL,
    avatar_image text
);


ALTER TABLE public."user" OWNER TO frod;

--
-- Name: clinics id; Type: DEFAULT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.clinics ALTER COLUMN id SET DEFAULT nextval('public.clinics_id_seq'::regclass);


--
-- Name: doctors id; Type: DEFAULT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.doctors ALTER COLUMN id SET DEFAULT nextval('public.doctors_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: password_reset_tokens id; Type: DEFAULT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.password_reset_tokens ALTER COLUMN id SET DEFAULT nextval('public.password_reset_tokens_id_seq'::regclass);


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- Data for Name: clinics; Type: TABLE DATA; Schema: public; Owner: frod
--

COPY public.clinics (id, name) FROM stdin;
1	╨Ч╨┤╨╛╤А╨╛╨▓тАЩ╤П+
2	╨Ь╨╡╨┤╨б╨╡╤А╨▓╤Ц╤Б
3	╨Ф╨╛╨▒╤А╨╛╨Ь╨╡╨┤
4	╨Ъ╨╗╤Ц╨╜╤Ц╨║╨░ ╨б╨▓╤П╤В╨╛╨│╨╛ ╨Ь╨╕╨║╨╛╨╗╨░╤П
5	╨б╤Ц╨╝╨╡╨╣╨╜╨░ ╨╝╨╡╨┤╨╕╤Ж╨╕╨╜╨░
\.


--
-- Data for Name: clinics_doctors_doctors; Type: TABLE DATA; Schema: public; Owner: frod
--

COPY public.clinics_doctors_doctors ("clinicsId", "doctorsId") FROM stdin;
\.


--
-- Data for Name: doctor_clinics; Type: TABLE DATA; Schema: public; Owner: frod
--

COPY public.doctor_clinics (doctor_id, clinic_id) FROM stdin;
5	1
5	2
6	1
6	3
7	2
7	4
8	4
8	5
9	3
9	5
\.


--
-- Data for Name: doctor_services; Type: TABLE DATA; Schema: public; Owner: frod
--

COPY public.doctor_services (doctor_id, service_id) FROM stdin;
5	1
5	2
6	3
7	2
7	4
8	5
9	1
9	3
9	4
\.


--
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: frod
--

COPY public.doctors (id, first_name, last_name, email, phone) FROM stdin;
5	╨Ж╨▓╨░╨╜	╨Я╨╡╤В╤А╨╡╨╜╨║╨╛	ivan.petrenko@example.com	+380671112233
6	╨Ю╨╗╨╡╨╜╨░	╨и╨╡╨▓╤З╨╡╨╜╨║╨╛	olena.shevchenko@example.com	+380931234567
7	╨С╨╛╨│╨┤╨░╨╜	╨Ъ╨╛╨▓╨░╨╗╨╡╨╜╨║╨╛	bohdan.kovalenko@example.com	+380661234567
8	╨Ь╨░╤А╤Ц╤П	╨У╨░╨▓╤А╨╕╨╗╤О╨║	mariya.havryliuk@example.com	+380501234567
9	╨Р╨╜╨┤╤А╤Ц╨╣	╨Ь╨╡╨╗╤М╨╜╨╕╨║	andrii.melnyk@example.com	+380681234567
\.


--
-- Data for Name: doctors_services_services; Type: TABLE DATA; Schema: public; Owner: frod
--

COPY public.doctors_services_services ("doctorsId", "servicesId") FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: frod
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1748946590514	AddAuthUserJWTClinicDoctorService1748946590514
2	1749037347278	AddResetPasswrod1749037347278
3	1749064017105	NewClinicAndDoctor1749064017105
4	1749066075729	UpdateDoctors1749066075729
5	1749067272600	UpdateDoctors1749067272600
6	1749132050115	ChangeResetPass1749132050115
7	1749131784746	ChangeResetPass1749131784746
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: frod
--

COPY public.password_reset_tokens (id, token, "userId", "createdAt") FROM stdin;
1	402ceb17-04ea-42f9-a5ef-30e613521bf2	c9e70cda-7f1e-4a53-b52e-ea218962b3bd	2025-06-05 14:01:55.404492
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: frod
--

COPY public.refresh_tokens (id, created, updated, refresh, device, user_id) FROM stdin;
bbf5608f-095d-4b35-b5aa-666a3708cd1b	2025-06-04 19:55:14.792636	2025-06-04 19:55:14.792636	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYTVhNGY3NzgtY2Q1My00MjY3LWI2ZDUtNzU0YWMzNDQ5YzQ2IiwiZGV2aWNlIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzNy4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiaWF0IjoxNzQ5MDY2OTE0LCJleHAiOjE3NDkxNjY5MTR9.rPMNhiVgva5jVleg9QZKYFU09X_7xe93gxCeqvjo_Pw	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36	a5a4f778-cd53-4267-b6d5-754ac3449c46
a09ea8f9-75e4-4f6a-a2d6-9b4b67dbdd5d	2025-06-05 14:05:30.707675	2025-06-05 14:05:30.707675	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzllNzBjZGEtN2YxZS00YTUzLWI1MmUtZWEyMTg5NjJiM2JkIiwiZGV2aWNlIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzNy4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiaWF0IjoxNzQ5MTMyMzMwLCJleHAiOjE3NDkyMzIzMzB9.Alx-F_rCOpJo-9LUwqbdsmm_H5ZdzwW94DdWxKY_RpE	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36	c9e70cda-7f1e-4a53-b52e-ea218962b3bd
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: frod
--

COPY public.services (id, name, description) FROM stdin;
1	╨в╤А╨░╨▓╨╝╨░╤В╨╛╨╗╨╛╨│╤Ц╤П	╨Ф╤Ц╨░╨│╨╜╨╛╤Б╤В╨╕╨║╨░ ╤В╨░ ╨╗╤Ц╨║╤Г╨▓╨░╨╜╨╜╤П ╤В╤А╨░╨▓╨╝ ╨║╤Ц╤Б╤В╨╛╨║, ╤Б╤Г╨│╨╗╨╛╨▒╤Ц╨▓, ╨╝тАЩ╤П╨╖╤Ц╨▓ ╤Ц ╨╖╨▓'╤П╨╖╨╛╨║. ╨Ф╨╛╨┐╨╛╨╝╨╛╨│╨░ ╨┐╤А╨╕ ╨┐╨╡╤А╨╡╨╗╨╛╨╝╨░╤Е, ╨▓╨╕╨▓╨╕╤Е╨░╤Е ╤В╨░ ╨╖╨░╨▒╨╛╤П╤Е
2	╨в╨╡╤А╨░╨┐╤Ц╤П	╨Я╨╡╤А╨▓╨╕╨╜╨╜╨░ ╨╝╨╡╨┤╨╕╤З╨╜╨░ ╨┤╨╛╨┐╨╛╨╝╨╛╨│╨░ ╨┐╤А╨╕ ╨╖╨░╨│╨░╨╗╤М╨╜╨╕╤Е ╨╖╨░╤Е╨▓╨╛╤А╤О╨▓╨░╨╜╨╜╤П╤Е, ╤В╨░╨║╨╕╤Е ╤П╨║ ╨╖╨░╤Б╤В╤Г╨┤╨╕, ╤Ц╨╜╤Д╨╡╨║╤Ж╤Ц╤Ч, ╤Е╤А╨╛╨╜╤Ц╤З╨╜╤Ц ╨╜╨╡╨┤╤Г╨│╨╕ ╤В╨░ ╤Ц╨╜╤И╤Ц ╨▓╨╜╤Г╤В╤А╤Ц╤И╨╜╤Ц ╤Е╨▓╨╛╤А╨╛╨▒╨╕
3	╨Т╨╡╤А╤В╨╡╨▒╤А╨╛╨╗╨╛╨│╤Ц╤П	╨б╨┐╨╡╤Ж╤Ц╨░╨╗╤Ц╨╖╨╛╨▓╨░╨╜╨░ ╨┤╨╛╨┐╨╛╨╝╨╛╨│╨░ ╨┐╤А╨╕ ╨╖╨░╤Е╨▓╨╛╤А╤О╨▓╨░╨╜╨╜╤П╤Е ╤Е╤А╨╡╨▒╤В╨░, ╤В╨░╨║╨╕╤Е ╤П╨║ ╨╛╤Б╤В╨╡╨╛╤Е╨╛╨╜╨┤╤А╨╛╨╖, ╨╝╤Ц╨╢╤Е╤А╨╡╨▒╤Ж╨╡╨▓╤Ц ╨│╤А╨╕╨╢╤Ц ╤В╨░ ╤Б╨║╨╛╨╗╤Ц╨╛╨╖
4	╨Ъ╨░╤А╨┤╤Ц╨╛╨╗╨╛╨│╤Ц╤П	╨Ф╤Ц╨░╨│╨╜╨╛╤Б╤В╨╕╨║╨░ ╤В╨░ ╨╗╤Ц╨║╤Г╨▓╨░╨╜╨╜╤П ╨╖╨░╤Е╨▓╨╛╤А╤О╨▓╨░╨╜╤М ╤Б╨╡╤А╤Ж╨╡╨▓╨╛-╤Б╤Г╨┤╨╕╨╜╨╜╨╛╤Ч ╤Б╨╕╤Б╤В╨╡╨╝╨╕: ╨│╤Ц╨┐╨╡╤А╤В╨╛╨╜╤Ц╤П, ╨░╤А╨╕╤В╨╝╤Ц╤Ч, ╤Ц╤И╨╡╨╝╤Ц╤З╨╜╨░ ╤Е╨▓╨╛╤А╨╛╨▒╨░ ╤Б╨╡╤А╤Ж╤П ╤В╨╛╤Й╨╛
5	╨Я╨╡╨┤╤Ц╨░╤В╤А╤Ц╤П	╨Ь╨╡╨┤╨╕╤З╨╜╨╡ ╨╛╨▒╤Б╨╗╤Г╨│╨╛╨▓╤Г╨▓╨░╨╜╨╜╤П ╨┤╤Ц╤В╨╡╨╣ ╨▓╤Ц╨┤ ╨╜╨░╤А╨╛╨┤╨╢╨╡╨╜╨╜╤П ╨┤╨╛ ╨┐╤Ц╨┤╨╗╤Ц╤В╨║╨╛╨▓╨╛╨│╨╛ ╨▓╤Ц╨║╤Г, ╨▓╨║╨╗╤О╤З╨░╤О╤З╨╕ ╨┐╤А╨╛╤Д╤Ц╨╗╨░╨║╤В╨╕╤З╨╜╤Ц ╨╛╨│╨╗╤П╨┤╨╕, ╨▓╨░╨║╤Ж╨╕╨╜╨░╤Ж╤Ц╤О ╤В╨░ ╨╗╤Ц╨║╤Г╨▓╨░╨╜╨╜╤П ╨╖╨░╤Е╨▓╨╛╤А╤О╨▓╨░╨╜╤М
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: frod
--

COPY public.tags (created, updated, id, name) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: frod
--

COPY public."user" (id, created, updated, first_name, last_name, email, password, phone, role, verify, ban, avatar_image) FROM stdin;
a5a4f778-cd53-4267-b6d5-754ac3449c46	2025-06-04 19:55:14.77566	2025-06-04 19:55:14.77566	╨Ж╨▓╨░╨╜	╨Я╨╡╤В╤А╨╡╨╜╨║╨╛	customer@gmail.com	$2b$10$PMppcnjOc/ixCnCsBHrNO.UrQMXF90TGEjEVj0zO6I9nIW1MUau8K	+381234567000	user	f	f	\N
c9e70cda-7f1e-4a53-b52e-ea218962b3bd	2025-06-04 19:25:50.895186	2025-06-05 14:04:51.370483	Frod	Vladyslav	test@gmail.com	$2b$10$X4FuS1ZlOaKMNWfbQ2YbC.AkA1YHo0tNsRoNfgdvzKEgD4JNw6uhm	+381223322344	admin	f	f	\N
fd8c541b-1063-40c5-ad07-81698d038fd7	2025-06-05 14:49:05.307346	2025-06-05 14:49:05.307346	admin	admin	admin@gmail.com	$2b$10$Z8WyLipGJ5kuPgLWd6lw8OUbM.SpJkT8VU7e8Al32NkUKT2Of.5.O	+381223322344	admin	f	f	\N
\.


--
-- Name: clinics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: frod
--

SELECT pg_catalog.setval('public.clinics_id_seq', 5, true);


--
-- Name: doctors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: frod
--

SELECT pg_catalog.setval('public.doctors_id_seq', 9, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: frod
--

SELECT pg_catalog.setval('public.migrations_id_seq', 7, true);


--
-- Name: password_reset_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: frod
--

SELECT pg_catalog.setval('public.password_reset_tokens_id_seq', 2, true);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: frod
--

SELECT pg_catalog.setval('public.services_id_seq', 5, true);


--
-- Name: doctors_services_services PK_2c40c59c35b3991933834cc1ffa; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.doctors_services_services
    ADD CONSTRAINT "PK_2c40c59c35b3991933834cc1ffa" PRIMARY KEY ("doctorsId", "servicesId");


--
-- Name: clinics PK_5513b659e4d12b01a8ab3956abc; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.clinics
    ADD CONSTRAINT "PK_5513b659e4d12b01a8ab3956abc" PRIMARY KEY (id);


--
-- Name: doctor_services PK_6c076fe4e383606e988414f18f7; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.doctor_services
    ADD CONSTRAINT "PK_6c076fe4e383606e988414f18f7" PRIMARY KEY (doctor_id, service_id);


--
-- Name: refresh_tokens PK_7d8bee0204106019488c4c50ffa; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY (id);


--
-- Name: doctors PK_8207e7889b50ee3695c2b8154ff; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: clinics_doctors_doctors PK_9e2b34f12f7bdf8719fc8098b3c; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.clinics_doctors_doctors
    ADD CONSTRAINT "PK_9e2b34f12f7bdf8719fc8098b3c" PRIMARY KEY ("clinicsId", "doctorsId");


--
-- Name: services PK_ba2d347a3168a296416c6c5ccb2; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: password_reset_tokens PK_d16bebd73e844c48bca50ff8d3d; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT "PK_d16bebd73e844c48bca50ff8d3d" PRIMARY KEY (id);


--
-- Name: doctor_clinics PK_d834afe319aa3ee7b3b0512f471; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.doctor_clinics
    ADD CONSTRAINT "PK_d834afe319aa3ee7b3b0512f471" PRIMARY KEY (doctor_id, clinic_id);


--
-- Name: tags PK_e7dc17249a1148a1970748eda99; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY (id);


--
-- Name: services UQ_019d74f7abcdcb5a0113010cb03; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT "UQ_019d74f7abcdcb5a0113010cb03" UNIQUE (name);


--
-- Name: doctors UQ_62069f52ebba471c91de5d59d61; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT "UQ_62069f52ebba471c91de5d59d61" UNIQUE (email);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_25402ecc528bdc7885e50ded58; Type: INDEX; Schema: public; Owner: frod
--

CREATE INDEX "IDX_25402ecc528bdc7885e50ded58" ON public.doctors_services_services USING btree ("doctorsId");


--
-- Name: IDX_3b8acdd4f81a745b7cafe31e78; Type: INDEX; Schema: public; Owner: frod
--

CREATE INDEX "IDX_3b8acdd4f81a745b7cafe31e78" ON public.doctor_clinics USING btree (clinic_id);


--
-- Name: IDX_7332c5a1ffea02df1ef5c16c55; Type: INDEX; Schema: public; Owner: frod
--

CREATE INDEX "IDX_7332c5a1ffea02df1ef5c16c55" ON public.doctor_services USING btree (doctor_id);


--
-- Name: IDX_8679bceaa0d0514f7e2a18ec12; Type: INDEX; Schema: public; Owner: frod
--

CREATE INDEX "IDX_8679bceaa0d0514f7e2a18ec12" ON public.doctor_services USING btree (service_id);


--
-- Name: IDX_8a2b400963b49f4af558e787c6; Type: INDEX; Schema: public; Owner: frod
--

CREATE INDEX "IDX_8a2b400963b49f4af558e787c6" ON public.refresh_tokens USING btree (device);


--
-- Name: IDX_a789c32c9b76e5a0bd2e8fee54; Type: INDEX; Schema: public; Owner: frod
--

CREATE INDEX "IDX_a789c32c9b76e5a0bd2e8fee54" ON public.clinics_doctors_doctors USING btree ("clinicsId");


--
-- Name: IDX_b2e208912ef83837bc062661aa; Type: INDEX; Schema: public; Owner: frod
--

CREATE INDEX "IDX_b2e208912ef83837bc062661aa" ON public.doctor_clinics USING btree (doctor_id);


--
-- Name: IDX_f4f1ea17d8809a8ae320db12af; Type: INDEX; Schema: public; Owner: frod
--

CREATE INDEX "IDX_f4f1ea17d8809a8ae320db12af" ON public.doctors_services_services USING btree ("servicesId");


--
-- Name: IDX_f80a8b67ac89537b287bd10998; Type: INDEX; Schema: public; Owner: frod
--

CREATE INDEX "IDX_f80a8b67ac89537b287bd10998" ON public.clinics_doctors_doctors USING btree ("doctorsId");


--
-- Name: doctors_services_services FK_25402ecc528bdc7885e50ded58e; Type: FK CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.doctors_services_services
    ADD CONSTRAINT "FK_25402ecc528bdc7885e50ded58e" FOREIGN KEY ("doctorsId") REFERENCES public.doctors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: doctor_clinics FK_3b8acdd4f81a745b7cafe31e789; Type: FK CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.doctor_clinics
    ADD CONSTRAINT "FK_3b8acdd4f81a745b7cafe31e789" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id);


--
-- Name: refresh_tokens FK_3ddc983c5f7bcf132fd8732c3f4; Type: FK CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: doctor_services FK_7332c5a1ffea02df1ef5c16c552; Type: FK CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.doctor_services
    ADD CONSTRAINT "FK_7332c5a1ffea02df1ef5c16c552" FOREIGN KEY (doctor_id) REFERENCES public.doctors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: doctor_services FK_8679bceaa0d0514f7e2a18ec12b; Type: FK CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.doctor_services
    ADD CONSTRAINT "FK_8679bceaa0d0514f7e2a18ec12b" FOREIGN KEY (service_id) REFERENCES public.services(id);


--
-- Name: clinics_doctors_doctors FK_a789c32c9b76e5a0bd2e8fee54c; Type: FK CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.clinics_doctors_doctors
    ADD CONSTRAINT "FK_a789c32c9b76e5a0bd2e8fee54c" FOREIGN KEY ("clinicsId") REFERENCES public.clinics(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: doctor_clinics FK_b2e208912ef83837bc062661aad; Type: FK CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.doctor_clinics
    ADD CONSTRAINT "FK_b2e208912ef83837bc062661aad" FOREIGN KEY (doctor_id) REFERENCES public.doctors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: password_reset_tokens FK_d6a19d4b4f6c62dcd29daa497e2; Type: FK CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT "FK_d6a19d4b4f6c62dcd29daa497e2" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: doctors_services_services FK_f4f1ea17d8809a8ae320db12afa; Type: FK CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.doctors_services_services
    ADD CONSTRAINT "FK_f4f1ea17d8809a8ae320db12afa" FOREIGN KEY ("servicesId") REFERENCES public.services(id);


--
-- Name: clinics_doctors_doctors FK_f80a8b67ac89537b287bd109986; Type: FK CONSTRAINT; Schema: public; Owner: frod
--

ALTER TABLE ONLY public.clinics_doctors_doctors
    ADD CONSTRAINT "FK_f80a8b67ac89537b287bd109986" FOREIGN KEY ("doctorsId") REFERENCES public.doctors(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: frod
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--


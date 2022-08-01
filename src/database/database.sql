-- public.client definition

-- Drop table

-- DROP TABLE public.client;

CREATE TABLE public.client (
	client_id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	first_name varchar(32) NOT NULL,
	last_name varchar(32) NOT NULL,
	phone varchar(16) NULL,
	CONSTRAINT client_pkey PRIMARY KEY (client_id)
);


-- public.provider definition

-- Drop table

-- DROP TABLE public.provider;

CREATE TABLE public.provider (
	provider_id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	provider_name varchar(32) NOT NULL,
	CONSTRAINT provider_pkey PRIMARY KEY (provider_id)
);


-- public.service definition

-- Drop table

-- DROP TABLE public.service;

CREATE TABLE public.service (
	service_id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	service_name varchar(32) NOT NULL,
	provider_id int4 NOT NULL,
	price money NOT NULL,
	duration int4 NOT NULL,
	CONSTRAINT service_pkey PRIMARY KEY (service_id),
	CONSTRAINT service_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.provider(provider_id) ON DELETE CASCADE
);


-- public.appointment definition

-- Drop table

-- DROP TABLE public.appointment;

CREATE TABLE public.appointment (
	appointment_id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	client_id int4 NOT NULL,
	service_id int4 NOT NULL,
	appointment_date date NOT NULL,
	appointment_time time NOT NULL,
	CONSTRAINT appointment_pkey PRIMARY KEY (appointment_id),
	CONSTRAINT appointment_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(client_id) ON DELETE CASCADE,
	CONSTRAINT appointment_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.service(service_id) ON DELETE CASCADE
);

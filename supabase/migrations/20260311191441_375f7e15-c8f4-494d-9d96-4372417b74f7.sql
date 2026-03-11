
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'receptionist', 'doctor', 'pharmacist');

-- Timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Auto-increment sequence helper for patient file no
CREATE SEQUENCE IF NOT EXISTS patient_file_no_seq START 1;

CREATE OR REPLACE FUNCTION public.generate_patient_file_no()
RETURNS TRIGGER AS $$
BEGIN
  NEW.patient_file_no := 'PF-' || LPAD(nextval('patient_file_no_seq')::text, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Organisation
CREATE TABLE public.organisation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_name TEXT NOT NULL DEFAULT '',
  logo_url TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Botswana',
  telephone TEXT,
  fax TEXT,
  cell TEXT,
  email TEXT,
  bhf_provider_no TEXT,
  vat_no TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.organisation ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read organisation" ON public.organisation FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage organisation" ON public.organisation FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Medical Aid Schemes
CREATE TABLE public.medical_aid_schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  scheme_code TEXT,
  plan_code TEXT,
  provider_bhf TEXT,
  contact TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.medical_aid_schemes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read schemes" ON public.medical_aid_schemes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage schemes" ON public.medical_aid_schemes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Consultants
CREATE TABLE public.consultants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  practice_no TEXT,
  specialty TEXT,
  contact TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.consultants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read consultants" ON public.consultants FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage consultants" ON public.consultants FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  service_code TEXT,
  fee NUMERIC(10,2) DEFAULT 0,
  category TEXT DEFAULT 'TARIFF',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read services" ON public.services FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Items (medications/consumables)
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  nappi_code TEXT,
  unit_price NUMERIC(10,2) DEFAULT 0,
  category TEXT,
  stock_qty INTEGER DEFAULT 0,
  reorder_level INTEGER DEFAULT 10,
  unit TEXT DEFAULT 'each',
  unit_cost NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read items" ON public.items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage items" ON public.items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Diagnoses (ICD-10)
CREATE TABLE public.diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icd10_code TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read diagnoses" ON public.diagnoses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage diagnoses" ON public.diagnoses FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Investigations
CREATE TABLE public.investigations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT,
  fee NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.investigations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read investigations" ON public.investigations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage investigations" ON public.investigations FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Procedures
CREATE TABLE public.procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT,
  fee NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.procedures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read procedures" ON public.procedures FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage procedures" ON public.procedures FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Patients
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_file_no TEXT UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  initials TEXT DEFAULT 'Mr',
  gender TEXT DEFAULT 'Male',
  date_of_birth DATE,
  address TEXT,
  mobile_phone_1 TEXT,
  mobile_phone_2 TEXT,
  email TEXT,
  omang_id TEXT,
  medical_aid_scheme_id UUID REFERENCES public.medical_aid_schemes(id),
  medical_aid_code TEXT,
  medical_aid_percentage NUMERIC(5,2) DEFAULT 80,
  membership_no TEXT,
  principal_member_name TEXT,
  relationship_to_member TEXT DEFAULT 'Self',
  registration_date DATE DEFAULT CURRENT_DATE,
  medical_aid_registration_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read patients" ON public.patients FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage patients" ON public.patients FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER set_patient_file_no BEFORE INSERT ON public.patients
FOR EACH ROW WHEN (NEW.patient_file_no IS NULL)
EXECUTE FUNCTION public.generate_patient_file_no();

-- Invoices
CREATE SEQUENCE IF NOT EXISTS invoice_no_seq START 1;

CREATE OR REPLACE FUNCTION public.generate_invoice_no()
RETURNS TRIGGER AS $$
BEGIN
  NEW.invoice_no := 'INV-' || LPAD(nextval('invoice_no_seq')::text, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_no TEXT UNIQUE,
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  medical_aid_scheme_id UUID REFERENCES public.medical_aid_schemes(id),
  consultant_id UUID REFERENCES public.consultants(id),
  total_amount NUMERIC(10,2) DEFAULT 0,
  medical_aid_amount NUMERIC(10,2) DEFAULT 0,
  patient_due NUMERIC(10,2) DEFAULT 0,
  export_status BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read invoices" ON public.invoices FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage invoices" ON public.invoices FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER set_invoice_no BEFORE INSERT ON public.invoices
FOR EACH ROW WHEN (NEW.invoice_no IS NULL)
EXECUTE FUNCTION public.generate_invoice_no();

-- Invoice Lines
CREATE TABLE public.invoice_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  line_type TEXT NOT NULL,
  item_code TEXT,
  item_code_type TEXT DEFAULT 'TARIFF',
  description TEXT,
  quantity INTEGER DEFAULT 1,
  fee NUMERIC(10,2) DEFAULT 0,
  benefit_amount NUMERIC(10,2) DEFAULT 0,
  icd10_code TEXT,
  diagnosis_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.invoice_lines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read invoice_lines" ON public.invoice_lines FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage invoice_lines" ON public.invoice_lines FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Prescriptions
CREATE TABLE public.prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  consultant_id UUID REFERENCES public.consultants(id),
  remarks TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read prescriptions" ON public.prescriptions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage prescriptions" ON public.prescriptions FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.prescription_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id UUID NOT NULL REFERENCES public.prescriptions(id) ON DELETE CASCADE,
  icd10_code TEXT,
  item_id UUID REFERENCES public.items(id),
  item_name TEXT,
  nappi_code TEXT,
  quantity INTEGER DEFAULT 1,
  dosage TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.prescription_lines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read prescription_lines" ON public.prescription_lines FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage prescription_lines" ON public.prescription_lines FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Sick Leaves
CREATE TABLE public.sick_leaves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  consultant_id UUID REFERENCES public.consultants(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sick_leaves ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read sick_leaves" ON public.sick_leaves FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage sick_leaves" ON public.sick_leaves FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.sick_leave_durations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sick_leave_id UUID NOT NULL REFERENCES public.sick_leaves(id) ON DELETE CASCADE,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  num_days INTEGER GENERATED ALWAYS AS (to_date - from_date + 1) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sick_leave_durations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read sick_leave_durations" ON public.sick_leave_durations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage sick_leave_durations" ON public.sick_leave_durations FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Referral Letters
CREATE TABLE public.referral_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  consultant_id UUID REFERENCES public.consultants(id),
  referred_to TEXT,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.referral_letters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read referral_letters" ON public.referral_letters FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage referral_letters" ON public.referral_letters FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Appointments
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  consultant_id UUID REFERENCES public.consultants(id),
  date_time TIMESTAMPTZ NOT NULL,
  appointment_type TEXT,
  status TEXT DEFAULT 'Scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read appointments" ON public.appointments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage appointments" ON public.appointments FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Batches
CREATE SEQUENCE IF NOT EXISTS batch_no_seq START 1;

CREATE OR REPLACE FUNCTION public.generate_batch_no()
RETURNS TRIGGER AS $$
BEGIN
  NEW.batch_no := LPAD(nextval('batch_no_seq')::text, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_no TEXT UNIQUE,
  medical_aid_scheme_id UUID REFERENCES public.medical_aid_schemes(id),
  batch_date DATE NOT NULL DEFAULT CURRENT_DATE,
  source TEXT,
  total_amount NUMERIC(10,2) DEFAULT 0,
  num_claims INTEGER DEFAULT 0,
  export_status BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read batches" ON public.batches FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage batches" ON public.batches FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER set_batch_no BEFORE INSERT ON public.batches
FOR EACH ROW WHEN (NEW.batch_no IS NULL)
EXECUTE FUNCTION public.generate_batch_no();

-- Batch Claims
CREATE TABLE public.batch_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  invoice_id UUID NOT NULL REFERENCES public.invoices(id),
  claim_gross NUMERIC(10,2) DEFAULT 0,
  num_lines INTEGER DEFAULT 0,
  script_no TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.batch_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read batch_claims" ON public.batch_claims FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage batch_claims" ON public.batch_claims FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Stock Received
CREATE TABLE public.stock_received (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  supplier TEXT,
  reference_no TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.stock_received ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read stock_received" ON public.stock_received FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage stock_received" ON public.stock_received FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.stock_received_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_received_id UUID NOT NULL REFERENCES public.stock_received(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES public.items(id),
  quantity INTEGER NOT NULL DEFAULT 0,
  unit_cost NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.stock_received_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read stock_received_items" ON public.stock_received_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage stock_received_items" ON public.stock_received_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Stock Dispensed
CREATE TABLE public.stock_dispensed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  patient_id UUID REFERENCES public.patients(id),
  invoice_id UUID REFERENCES public.invoices(id),
  item_id UUID NOT NULL REFERENCES public.items(id),
  quantity INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.stock_dispensed ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read stock_dispensed" ON public.stock_dispensed FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage stock_dispensed" ON public.stock_dispensed FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Stock Adjustments
CREATE TABLE public.stock_adjustments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  item_id UUID NOT NULL REFERENCES public.items(id),
  adjustment_type TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.stock_adjustments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read stock_adjustments" ON public.stock_adjustments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage stock_adjustments" ON public.stock_adjustments FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- User Roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at triggers
CREATE TRIGGER update_organisation_updated_at BEFORE UPDATE ON public.organisation FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_medical_aid_schemes_updated_at BEFORE UPDATE ON public.medical_aid_schemes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_consultants_updated_at BEFORE UPDATE ON public.consultants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_items_updated_at BEFORE UPDATE ON public.items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_investigations_updated_at BEFORE UPDATE ON public.investigations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_procedures_updated_at BEFORE UPDATE ON public.procedures FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_prescriptions_updated_at BEFORE UPDATE ON public.prescriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sick_leaves_updated_at BEFORE UPDATE ON public.sick_leaves FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_referral_letters_updated_at BEFORE UPDATE ON public.referral_letters FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_batches_updated_at BEFORE UPDATE ON public.batches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

go
drop database QuanLySoTietKiem
go
create database QuanLySoTietKiem
go
use QuanLySoTietKiem
go

create table QuyDinh(
	ID int,
	TenQuyDinh nvarchar(100) not null,
	MoTa int,
	DonVi nvarchar(10),
	constraint PK_QuyDinh primary key (ID)
)

create table LoaiTietKiem(
	MaLoaiTietKiem int,
	MoTa nvarchar(20) not null,
	SoThang int,
	LaiSuat float not null,
	constraint PK_LoaiTietKiem primary key (MaLoaiTietKiem)
)

create table SoTietKiem(
	MaSoTietKiem int,
	MaLoaiTietKiem int not null,
	HoTenKhachHang nvarchar(50) not null,
	DiaChi nvarchar(80) not null,
	CMND char(12) not null,
	NgayMoSo date not null,
	SoTien float not null ,
	TinhTrang bit default 1,
	constraint PK_SoTietKiem primary key (MaSoTietKiem)
)

alter table SoTietKiem add constraint FK_STK_LTK foreign key (MaLoaiTietKiem) references LoaiTietKiem(MaLoaiTietKiem)

create table PhieuGuiTien(
	MaPhieuGuiTien int,
	MaSoTietKiem int not null,
	NgayGui date not null,
	SoTienGui float not null,
	constraint PK_PhieuGuiTien primary key(MaPhieuGuiTien)
)
alter table PhieuGuiTien add constraint FK_PGT_STK foreign key (MaSoTietKiem) references SoTietKiem(MaSoTietKiem)

create table PhieuRutTien(
	MaPhieuRutTien int,
	MaSoTietKiem int not null,
	NgayRut date not null,
	SoTienRut float not null,
	constraint PK_PhieuRutTien primary key(MaPhieuRutTien)
)
alter table PhieuRutTien add constraint FK_PRT_STK foreign key (MaSoTietKiem) references SoTietKiem(MaSoTietKiem)

insert into QuyDinh(ID,TenQuyDinh,MoTa,DonVi) values
(1, N'Tiền gửi tối thiểu', 100000, N'VNĐ'),
(2, N'Thời gian gửi tối thiểu', 15, N'ngày')

insert into LoaiTietKiem(MaLoaiTietKiem, MoTa, SoThang, LaiSuat)
values
(1, N'Không kỳ hạn', NULL, 0.15),
(2, N'3 tháng', 3, 0.5),
(3, N'6 tháng', 6, 0.55);

insert into SoTietKiem(MaSoTietKiem, MaLoaiTietKiem, HoTenKhachHang, DiaChi, CMND, NgayMoSo, SoTien)
values
(1, 1, N'Huỳnh Minh Thuận', N'Phú Mỹ Hưng, Quận 7, TP.Hồ Chí Minh', '010101010101', GETDATE(), 200000),
(2, 2, N'Phạm Hữu Trọng', N'Đường 279, Quận Tuấn Giao, Điện Biên', '020202020202', GETDATE(), 400000),
(3, 3, N'Hồ Thị Như Lệ', N'389 Trung Đình, Hà Nội', '030303030303', GETDATE(), 100000),
(4, 1, N'Lê Thanh Huyền', N'166-168 Nguyễn Văn Linh, Huyện Thanh Khê, Đà Nẵng', '040404040404', GETDATE(), 500000),
(5, 2, N'Chu Thành Mạnh', N'Toà nhà Waseco, Lầu 5, Số 10 Phổ Quang, Tân Bình, TP.Hồ Chí Minh', '050505050505', GETDATE(), 1000000),
(6, 3, N'Võ Ngọc Chi', N'129 Huỳnh Văn Bánh, Quận 12, Phú Nhuận, TP.Hồ Chí Minh', '030303030303', GETDATE(), 700000);
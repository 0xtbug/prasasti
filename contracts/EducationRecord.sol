// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title EducationRecord - Pencatatan nilai/sertifikat berbasis blockchain
/// @notice Contoh sederhana untuk final project struktur blockchain di bidang pendidikan
contract EducationRecord {
    address public owner;

    struct Record {
        string studentId;   // NIM atau ID mahasiswa
        string course;      // Mata kuliah
        string grade;       // Nilai atau status (A, B, Lulus, dsb)
        uint256 timestamp;  // Waktu pencatatan
        address issuer;     // Alamat yang mencatat (dosen/admin)
    }

    uint256 public recordCount;
    mapping(uint256 => Record) public records;

    event RecordCreated(
        uint256 indexed recordId,
        string studentId,
        string course,
        string grade,
        address indexed issuer,
        uint256 timestamp
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Hanya owner yang boleh");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Mengganti owner (opsional, kalau mau multi admin bisa dikembangkan)
    function changeOwner(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Alamat tidak boleh 0");
        owner = _newOwner;
    }

    /// @notice Membuat record baru (dilakukan oleh dosen/admin)
    function createRecord(
        string calldata _studentId,
        string calldata _course,
        string calldata _grade
    ) external onlyOwner returns (uint256) {
        recordCount += 1;

        records[recordCount] = Record({
            studentId: _studentId,
            course: _course,
            grade: _grade,
            timestamp: block.timestamp,
            issuer: msg.sender
        });

        emit RecordCreated(
            recordCount,
            _studentId,
            _course,
            _grade,
            msg.sender,
            block.timestamp
        );

        return recordCount;
    }

    /// @notice Mengambil data record berdasarkan ID
    function getRecord(uint256 _recordId)
        external
        view
        returns (
            string memory studentId,
            string memory course,
            string memory grade,
            uint256 timestamp,
            address issuer
        )
    {
        require(_recordId > 0 && _recordId <= recordCount, "Record tidak ditemukan");
        Record memory r = records[_recordId];
        return (r.studentId, r.course, r.grade, r.timestamp, r.issuer);
    }

    /// @notice Verifikasi kecocokan data dasar (opsional)
    /// @dev Mengembalikan true jika studentId & course sesuai dengan recordId
    function verifyRecord(
        uint256 _recordId,
        string calldata _studentId,
        string calldata _course
    ) external view returns (bool) {
        require(_recordId > 0 && _recordId <= recordCount, "Record tidak ditemukan");
        Record memory r = records[_recordId];

        bool sameStudent = (keccak256(abi.encodePacked(r.studentId)) ==
            keccak256(abi.encodePacked(_studentId)));
        bool sameCourse = (keccak256(abi.encodePacked(r.course)) ==
            keccak256(abi.encodePacked(_course)));

        return sameStudent && sameCourse;
    }
}
